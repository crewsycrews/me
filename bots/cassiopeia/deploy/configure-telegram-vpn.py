#!/usr/bin/env python3
"""Convert a VLESS TCP/REALITY URI from hidden input to a Telegram-only Xray config."""

import argparse
import base64
import getpass
import json
import os
from pathlib import Path
import re
import sys
import uuid
from urllib.parse import parse_qs, unquote, urlsplit


def make_config(uri):
    parsed = urlsplit(uri.strip())
    query = parse_qs(parsed.query, keep_blank_values=True)

    def field(name, default=None):
        values = query.get(name, [default])
        if len(values) != 1 or values[0] is None:
            raise ValueError('Missing or ambiguous VLESS parameter')
        return values[0]

    if parsed.scheme != 'vless' or not parsed.hostname or parsed.password:
        raise ValueError('Expected a VLESS URI')
    identifier = str(uuid.UUID(unquote(parsed.username or '')))
    port = parsed.port or 443
    if not 1 <= port <= 65535:
        raise ValueError('Invalid VLESS port')
    if field('type', 'tcp') != 'tcp' or field('security') != 'reality' or field('encryption', 'none') != 'none':
        raise ValueError('Only VLESS TCP/REALITY without additional encryption is supported')
    flow = field('flow', '')
    if flow not in ('', 'xtls-rprx-vision'):
        raise ValueError('Unsupported VLESS flow')
    public_key = field('pbk')
    if not re.fullmatch(r'[A-Za-z0-9_-]{43}', public_key) or len(base64.urlsafe_b64decode(public_key + '=')) != 32:
        raise ValueError('Invalid REALITY public key')
    short_id = field('sid', '')
    if not re.fullmatch(r'(?:[0-9a-fA-F]{2}){0,8}', short_id):
        raise ValueError('Invalid REALITY short ID')
    server_name = field('sni')
    if not re.fullmatch(r'[A-Za-z0-9.-]+', server_name):
        raise ValueError('Invalid REALITY server name')
    fingerprint = field('fp', 'chrome')
    if fingerprint not in ('chrome', 'firefox', 'safari', 'ios', 'android', 'edge', '360', 'qq', 'random', 'randomized'):
        raise ValueError('Unsupported REALITY fingerprint')

    return {
        'log': {'access': 'none', 'loglevel': 'warning'},
        'inbounds': [{
            'tag': 'bot-http', 'listen': '0.0.0.0', 'port': 1080,
            'protocol': 'http', 'settings': {},
        }],
        # Xray uses the first outbound for unmatched destinations: fail closed.
        'outbounds': [
            {'tag': 'deny', 'protocol': 'blackhole', 'settings': {}},
            {
                'tag': 'telegram-vpn', 'protocol': 'vless',
                'settings': {'vnext': [{
                    'address': parsed.hostname, 'port': port,
                    'users': [{'id': identifier, 'encryption': 'none', 'flow': flow}],
                }]},
                'streamSettings': {
                    'network': 'tcp', 'security': 'reality',
                    'realitySettings': {
                        'show': False, 'serverName': server_name,
                        'fingerprint': fingerprint, 'password': public_key,
                        'shortId': short_id, 'spiderX': field('spx', '/'),
                    },
                },
            },
        ],
        'routing': {
            'domainStrategy': 'AsIs',
            'rules': [{
                'type': 'field', 'inboundTag': ['bot-http'],
                'domain': ['full:api.telegram.org'], 'port': '443', 'network': 'tcp',
                'outboundTag': 'telegram-vpn',
            }],
        },
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', default='/etc/cassiopeia/xray/config.json')
    args = parser.parse_args()
    try:
        uri = getpass.getpass('VLESS URI: ') if sys.stdin.isatty() else sys.stdin.readline()
        config = make_config(uri)
    except (ValueError, TypeError):
        # Parsing errors must never echo credentials from the input URI.
        print('Invalid or unsupported VLESS TCP/REALITY URI.', file=sys.stderr)
        return 1
    path = Path(args.output)
    path.parent.mkdir(parents=True, exist_ok=True)
    # Exclusive creation prevents accidentally replacing a live configuration.
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, 'w') as file:
        json.dump(config, file, ensure_ascii=False, indent=2)
        file.write('\n')
    print('Telegram-only Xray configuration written; URI was not logged.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
