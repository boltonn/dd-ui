BACKEND_NAME := backend
TODAY := $(shell date +%Y%m%d)
WORKDIR := $(shell pwd)

install-backend:
	@cd $(WORKDIR)/api && conda env update -f environment.yml --prune

install-frontend:
	npm install

install: install-backend install-frontend

start-backend:
	conda run --no-capture-output -n $(BACKEND_NAME) api

start-frontend:
	npm run next-dev

start: npm run dev

test-backend:
	$(CONDA_ACTIVATE) $(BACKEND_NAME)
	pytest -W ignore::DeprecationWarning

style-backend:
	$(CONDA_ACTIVATE) $(BACKEND_NAME)
	black --line-length=140 .
	flake8 --max-line-length=140 . --per-file-ignores="__init__.py:F401"
	isort .