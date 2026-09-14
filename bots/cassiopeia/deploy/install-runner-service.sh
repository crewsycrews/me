#!/usr/bin/env bash
set -euo pipefail

runner_dir=${1:-/opt/actions-runner}
runner_user=${2:-github-runner}
template_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
[[ $EUID -eq 0 ]] || { echo 'Run this installer with sudo.' >&2; exit 1; }
id "$runner_user" >/dev/null
cd -- "$runner_dir"
[[ -f .runner && -x svc.sh ]] || { echo 'Register the runner with config.sh first.' >&2; exit 1; }
[[ ! -f .service ]] || { echo 'A runner service is already installed; use ./svc.sh status.' >&2; exit 1; }

# svc.sh creates the correctly named unit, prepares runsvc.sh and enables boot startup.
GITHUB_ACTIONS_RUNNER_SERVICE_TEMPLATE="$template_dir/runner.service.template" ./svc.sh install "$runner_user"
./svc.sh start
