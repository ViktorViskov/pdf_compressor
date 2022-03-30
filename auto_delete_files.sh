while [ true ]
do
    # delete all files from upload older then 60 minuts
    find /public/u/ -type f -mmin +60 -delete

    # delete all files from compress older then 60 minuts
    find /public/c/ -type f -mmin +60 -delete

    # pause 5 minuts
    sleep 300
done