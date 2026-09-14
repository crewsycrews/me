#!/usr/bin/env bash
set -euo pipefail

# Also accepts a checkout path for a manual run; GitHub Actions uses /opt/me.
cd -- "${1:-/opt/me}"

fail() {
  printf '%s\n' "$1" >&2
  exit 1
}

command -v docker >/dev/null || fail 'Docker is required on the deployment host.'
command -v flock >/dev/null || fail 'flock (util-linux) is required on the deployment host.'
git rev-parse --is-inside-work-tree >/dev/null
exec 9>"$(git rev-parse --git-path cassiopeia-deploy.lock)"
flock -n 9 || fail 'Another Cassiopeia deployment is already running.'

[[ $(git branch --show-current) == master ]] || fail 'The server checkout must be on master.'
git diff --quiet && git diff --cached --quiet || fail 'Tracked files have local changes; resolve them before deploying.'

export GIT_TERMINAL_PROMPT=0
export GIT_SSH_COMMAND='ssh -o BatchMode=yes -o StrictHostKeyChecking=yes'
if [[ -n ${DEPLOY_GITHUB_TOKEN:-} ]]; then
  # Use the job's read-only token for this fetch only. Keep the cloned SSH origin
  # intact and do not copy root's private keys or persist authentication in Git.
  git_auth=$(printf 'x-access-token:%s' "$DEPLOY_GITHUB_TOKEN" | base64 | tr -d '\n')
  GIT_CONFIG_COUNT=2 \
    GIT_CONFIG_KEY_0=url.https://github.com/.insteadOf \
    GIT_CONFIG_VALUE_0=git@github.com: \
    GIT_CONFIG_KEY_1=http.https://github.com/.extraheader \
    GIT_CONFIG_VALUE_1="AUTHORIZATION: basic $git_auth" \
    git fetch origin master
  unset git_auth DEPLOY_GITHUB_TOKEN
else
  git fetch origin master
fi
git merge-base --is-ancestor HEAD FETCH_HEAD || fail 'The server has local commits or divergent history; refusing to overwrite them.'
git merge --ff-only FETCH_HEAD
printf 'Deploying revision %s\n' "$(git rev-parse HEAD)"

cd bots/cassiopeia
[[ -f .env ]] || fail 'Create /opt/me/bots/cassiopeia/.env from .env.example and configure the bot first.'
docker compose config --quiet

# Build while the existing container continues serving requests. Never remove volumes.
docker compose build --pull cassiopeia
if ! docker compose up --detach --no-build --force-recreate --wait --wait-timeout 180 cassiopeia; then
  docker compose ps
  docker compose logs --tail=50 cassiopeia
  fail 'Cassiopeia failed to become healthy; inspect the container before retrying.'
fi
docker compose ps
