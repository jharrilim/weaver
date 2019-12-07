# Weaver

![Github Actions: Build & Test](https://github.com/jharrilim/weaver/workflows/Node%20CI/badge.svg)

## Scope

- Microservice initialization and management
  - Node first, potentially multi-language support for codegen
- VS Code integrations
  - Devcontainers
  - Tasks
  - Workspaces
- Github actions
  - CI
  - AWS/GCP/Azure deployments
- 12 Factor Kubernetes
  - Environment config
  - Backing services
  - Multi-environment deployment
  - Port Bindings

## Try it Out

Currently Weaver is not ready for production use. You can however try it after cloning the project and entering the repo:

```sh
npm i
npm run bootstrap
npm run build

node packages/cli/lib # Currently output goes into weavertest in your temp dir.
```
