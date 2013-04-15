msg="$1"

git add .
git commit -am"$msg"

git checkout gh-pages
git merge

git checkout master
git push
