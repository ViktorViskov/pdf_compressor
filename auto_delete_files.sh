while [ true ]
do
    # delete all files from tmp older then 60 minuts
    find /tmp/ -type f -mmin +60 -delete

    # pause 5 minuts
    sleep 300
done