#ssh -t tonto@157.230.22.53 "echo -e 'ikaros123\nikaros123\n' | sudo chown -R tonto:tonto ~/brewsmasher"
rsync -r ./ tonto@157.230.22.53:~/brewsmasher --no-group --no-perms --no-times
ssh -t tonto@157.230.22.53 "sudo chown -R www-data:www-data ~/brewsmasher"
