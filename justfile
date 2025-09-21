all:
    @echo "Nothing to do for all"

build:
    npm run build

live:
    npm run live

dev:
    npm run dev

clean:
    rm -r ./out

clean-deep:
    rm -r ./out ./node_modules ./.next
