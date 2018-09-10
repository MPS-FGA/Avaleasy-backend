run:
	@echo "*********************************\n"
	@echo "Lifting up the whole environment!\n"
	@echo "*********************************\n"
	@docker-compose up

quiet-run:
	@echo "*********************************\n"
	@echo "Quietly lifting up the whole environment!\n"
	@echo "*********************************\n"
	@docker-compose up --detach
	@echo "\nDONE\n"	

install:
	@echo "\nInstalling Avaleasy dependencies..."
	@docker exec -it avaleasy-backend yarn install
	@echo "\nDONE\n"

run-db:
	@echo "************************\n"
	@echo "Lifting up the database!\n"
	@echo "************************\n"
	@docker-compose up db
	@echo "\nDONE\n"

run-api:
	@echo "*************************\n"
	@echo "Lifting up the api!\n"
	@echo "*************************\n"
	@docker-compose up api
	@echo "\nDONE\n"

exec:
	@echo "*************************\n"
	@echo "Entering API environment!\n"
	@echo "*************************\n"
	@docker exec -it avaleasy-backend /bin/sh
	@echo "\nDONE\n"

down:
	@echo "******************************\n"
	@echo "Dropping down the environment!\n"
	@echo "******************************\n"
	@docker-compose down
	@echo "\nDONE\n"

ps:
	@echo "************************\n"
	@echo "Listing running services\n"
	@echo "************************\n"
	@docker-compose ps
	@echo "\nDONE\n"

rm-network:
	@echo "**********************************\n"
	@echo "Removing Avaleasy network!\n"
	@echo "**********************************\n"
	@docker network rm avaleasy-net
	@echo "\nDONE\n"

help:
	@echo "\n\t\t\t\tAvaleasy"
	@echo "\tmake run - Runs the Avaleasy environment"
	@echo "\tmake quiet-run - Runs the Avaleasy environment in background"
	@echo "\tmake run-db - Runs the Avaleasy database"
	@echo "\tmake run-api - Runs the Avaleasy API"
	@echo "\tmake down - Drops the Avaleasy environment"
	@echo "\tmake install - Installs the Avaleasy API dependencies"
	@echo "\tmake ps - List the Avaleasy running services"
	@echo "\tmake rm-network - Removes the default network created by Avaleasy"
	@echo "\tmake help - Outputs this list\n"
