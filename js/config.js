var config = {
    time: {
        timeFormat: 24,
        displaySeconds: true,
        digitFade: false,
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'Den Haag,Netherlands',
            units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'nl',
            APPID: '<>'
        }
    },
    news: {
        feed: ['https://www.nu.nl/rss/Algemeen','https://www.nu.nl/rss/Economie','http://www.nu.nl/rss/Beurs']
    },
    ethereum: {
        api_key:'<>',
        pub_address:'<>',
    }
}
