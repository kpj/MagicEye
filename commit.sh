msg="$1"

git add .
git commit -am"$msg"

git checkout gh-pages
git merge master

git checkout master
git push
