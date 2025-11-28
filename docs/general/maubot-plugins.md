---
title: "Maubot Plugins"
---

# Maubot Plugins

[up Maubot](/general/setting-up-maubot) for documentation ## Plugin Configurations ### React Bot https://github.com/maubot/reactbot


#### ProxyFront End
```
templates:
    nitter:
        type: m.room.message
        content:
            msgtype: m.text
            body: https://nitter.net/${1}/status/${2}

default_flags:
- ignorecase
antispam:
    room:
        max: 1
        delay: 60
    user:
        max: 2
        delay: 60

rules:
    twitter:
        matches:
        - https://twitter.com/(.+?)/status/(\d+)
        - https://x.com/(.+?)/status/(\d+)

        template: nitter
```
```
templates:
    invidious:
        type: m.room.message
        content:
            msgtype: m.text
            body: https://invidious.slipfox.xyz/watch?v=${1}

default_flags:
- ignorecase

rules:
    youtube:
        matches:
        - https://www.youtube.com/watch\?v=(.+)
        template: invidious
```

### News Paywall Bypass
```
templates:
    newsarchiver:
        type: m.room.message
        content:
            msgtype: m.text
            body: Paywall Bypass of Your Link https://1ft.io/${0}/${1} -- OR-- https://12ft.io/${0}/${1} --OR-- https://web.archive.org/web/2023/${0}/${1}

default_flags:
- ignorecase
antispam:
    room:
        max: 10
        delay: 5
    user:
        max: 20
        delay: 1

rules:
    news:
        matches:
        - https://(www\.)?nytimes.com/(.+)
        - https://(www\.)?nyt.com/(.+)
        - https://(www\.)?bbc.com/(.+)
        - https://(www\.)?cnn.com/(.+)
        - https://(www\.)?reuters.com/(.+)
        - https://(www\.)?apnews.com/(.+)
        - https://(www\.)?washingtonpost.com/(.+)
        - https://(www\.)?usatoday.com/(.+)
        - https://(www\.)?abcnews.go.com/(.+)
        - https://(www\.)?nbcnews.com/(.+)
        - https://(www\.)?aljazeera.com/(.+)
        - https://(www\.)?theguardian.com/(.+)
        - https://(www\.)?republicworld.com/(.+)
        - https://(www\.)?independent.co.uk/(.+)
        - https://(www\.)?thesun.co.uk/(.+)
        template: newsarchiver
## Add more rules as needed
```

### RSS Bot
https://github.com/maubot/rss Basic commands:

- `!rss subscribe &lt;url&gt;` - Subscribe the current room to a feed.

- `!rss unsubscribe &lt;feed ID&gt;` - Unsubscribe the current room from a feed.

- `!rss subscriptions` - List subscriptions (and feed IDs) in the current room.

- `!rss notice &lt;feed ID&gt; [- Set whether the bot should send new posts as m.notice` (if false, they’re sent as `m.text`).

- `!rss template &lt;feed ID&gt; [new template](true/false]`) - Change the post template for a feed in the current room. If the new template is omitted, the bot replies with the current template.

```
# Feed update interval in minutes
update_interval: 60
## Maximum backoff in minutes when failing to fetch feeds (defaults to 5 days)
max_backoff: 7200
## The time to sleep between send requests when broadcasting a new feed entry.
## Set to 0 to disable sleep or -1 to run all requests asynchronously at once.
spam_sleep: 2
## The prefix for all commands
## It has to be prefixed with ! in matrix to be recognized
command_prefix: rss
## Default post notification template for new subscriptions
notification_template: 'New post in $feed_title: [$title](/link-title)'
## Users who can bypass room permission checks
admins:
- '@sac:irregularchat.com'
- '@sacmin:irregularchat.com'
```
