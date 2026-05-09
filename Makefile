############################################################################### Main
help:
	@cls
	@echo ""
	@echo "___________.__  __                                 _____ __________.___ "
	@echo "\_   _____/|__|/  |_  ____   ____   ______ ______ /  _  \\______   \   |"
	@echo " |    __)  |  \   __\/    \_/ __ \ /  ___//  ___//  /_\  \|     ___/   |"
	@echo " |     \   |  ||  | |   |  \  ___/ \___ \ \___ \/    |    \    |   |   |"
	@echo " \___  /   |__||__| |___|  /\___  >____  >____  >____|__  /____|   |___|"
	@echo "     \/                  \/     \/     \/     \/        \/              "
	@echo ""
	@type $(MAKEFILE_LIST) | findstr /R "^[a-zA-Z_-]*:.*"

############################################################################### Project support
# Project support

dev: ## run api // http://localhost:3000/api-docs/
	@npm run dev

commit:
	@powershell -Command "$$message = Read-Host 'Enter commit message'; git add .; git commit -m $$message; git push origin main"

startDocker:
	@docker-compose up -d

killPort:
	@powershell -Command "Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $$_.OwningProcess -Force }"

format: ## format code
	@npm run format

reset: ## reset packages
	@powershell -Command "Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue"
	@npm install

build: ## build project
	@npm run build