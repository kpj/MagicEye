msg="$1"

# make sure we are on master branch
git checkout master

# add latest changes
git add .
git commit -am"$msg"

# also apply them in gh-pages
git checkout gh-pages
git merge master
git push

# and finally in master
git checkout master
git push
