# nodejs-express-knexjs-docker
nodejs expressjs knexjs docker

# How to create postgres docker image
docker run --name postgres-article -e POSTGRES_PASSWORD=123456 -d -p 4321:5432  postgres

# How to run postgres docker image
docker run --name postgres-article -e POSTGRES_PASSWORD=123456 -d postgres

# How to run postgres
docker exec -it postgres-article psql -U postgres
