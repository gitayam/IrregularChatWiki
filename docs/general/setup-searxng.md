---
title: "Setup SearXNG"
---

# Setup SearXNG

Return to [https://docs.searxng.org/admin/installation-docker.html

```shell
export PORT=8080
docker pull searxng/searxng
docker run --rm \
             -d -p ${PORT}:8991 \
             -v "${PWD}/searxng:/etc/searxng" \
             -e "BASE_URL=https://localhost:$PORT/" \
             -e "INSTANCE_NAME=irregularchat-searxng" \
             searxng/searxng
```

### Cloudflare Setup
Set tunnel to point to HTTP &gt;&gt; localhost:8991


### Settings Configuration for SearXNG
After launching SearXNG you’ll need to modify the settings.yml file which should be created in a directory ./searxng

After modifying the setting file, you’ll need to restart the container.

```shell
docker restart containerID_HERE
```

### Config
```
general:
  # Debug mode, only for development. Is overwritten by ${SEARXNG_DEBUG}
  debug: false
  # displayed name
  instance_name: &quot;irregularchat-searxng&quot;
  # For example: https://example.com/privacy
  privacypolicy_url: false
  # use true to use your own donation page written in searx/info/en/donate
  # use false to disable the donation link
  donation_url: false
  # mailto:contact@example.com
  contact_url: false
  # record stats
  enable_metrics: true

brand:
  wiki_url : https://irregularpedia.org
  custom:
    maintainer: &quot;IrregularChat Community of Interest&quot;
   # Custom entries in the footer: [title](server-guides](/server-guides)): [links:
      &quot;Research Wiki&quot;: https://irregularpedia.org/research/
      &quot;Remote Virtual Environment&quot;: &quot;https://vm.irregularchat.com/&quot;

search:
  # Filter results. 0: None, 1: Moderate, 2: Strict
  safe_search: 0
  # Existing autocomplete backends: &quot;dbpedia&quot;, &quot;duckduckgo&quot;, &quot;google&quot;, &quot;yandex&quot;, &quot;mwmbl&quot;,
  # &quot;seznam&quot;, &quot;startpage&quot;, &quot;stract&quot;, &quot;swisscows&quot;, &quot;qwant&quot;, &quot;wikipedia&quot; - leave blank to turn it off
  # by default.
  autocomplete: &quot;google&quot;
  # minimun characters to type before autocompleter starts
  autocomplete_min: 2
  # Default search language - leave blank to detect from browser information or
  # use codes from 'languages.py'
  default_lang: &quot;auto&quot;
  # max_page: 0  # if engine supports paging, 0 means unlimited numbers of pages
  # Available languages
  # languages:
  #   - all
  #   - en
  #   - en-US
  #   - de
  #   - it-IT
  #   - fr
  #   - fr-BE
  # ban time in seconds after engine errors
  ban_time_on_fail: 5
  # max ban time in seconds after engine errors
  max_ban_time_on_fail: 120
  suspended_times:
    # Engine suspension time after error (in seconds; set to 0 to disable)
    # For error &quot;Access denied&quot; and &quot;HTTP error [402, 403](link])&quot;
    SearxEngineAccessDenied: 86400
    # For error &quot;CAPTCHA&quot;
    SearxEngineCaptcha: 86400
    # For error &quot;Too many request&quot; and &quot;HTTP error 429&quot;
    SearxEngineTooManyRequests: 3600
    # Cloudflare CAPTCHA
    cf_SearxEngineCaptcha: 1296000
    cf_SearxEngineAccessDenied: 86400
    # ReCAPTCHA
    recaptcha_SearxEngineCaptcha: 604800

  # remove format to deny access, use lower case.
  # formats: [csv, json, rss](html,)
  formats:
    - html
    - csv
    - json
    - rss

server:
  # Is overwritten by ${SEARXNG_PORT} and ${SEARXNG_BIND_ADDRESS}
  port: 8888
  bind_address: &quot;127.0.0.1&quot;
  # public URL of the instance, to ensure correct inbound links. Is overwritten
  # by ${SEARXNG_URL}.
  base_url: https://search.irregularchat.com/  # &quot;http://example.com/location&quot;
  limiter: false  # rate limit the number of request on the instance, block some bots
  public_instance: true  # enable features designed only for public instances

  # If your instance owns a /etc/searxng/settings.yml file, then set the following
  # values there.

  secret_key: &quot;secret_here&quot;  # Is overwritten by ${SEARXNG_SECRET}
  # Proxying image results through searx
  image_proxy: false
  # 1.0 and 1.1 are supported
  http_protocol_version: &quot;1.0&quot;
  # POST queries are more secure as they don't show up in history but may cause
  # problems when using Firefox containers
  method: &quot;POST&quot;
  default_http_headers:
    X-Content-Type-Options: nosniff
    X-Download-Options: noopen
    X-Robots-Tag: noindex, nofollow
    Referrer-Policy: no-referrer

redis:
  # URL to connect redis database. Is overwritten by ${SEARXNG_REDIS_URL}.
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: false

ui:
  # Custom static path - leave it blank if you didn't change
  static_path: &quot;&quot;
  static_use_hash: false
  # Custom templates path - leave it blank if you didn't change
  templates_path: &quot;&quot;
  # query_in_title: When true, the result page's titles contains the query
  # it decreases the privacy, since the browser can records the page titles.
  query_in_title: false
  # infinite_scroll: When true, automatically loads the next page when scrolling to bottom of the current page.
  infinite_scroll: true
  # ui theme
  default_theme: simple
  # center the results ?
  center_alignment: true
  # URL prefix of the internet archive, don't forget trailing slash (if needed).
  # cache_url: &quot;https://webcache.googleusercontent.com/search?q=cache:&quot;
  # Default interface locale - leave blank to detect from browser information or
  # use codes from the 'locales' config section
  default_locale: &quot;&quot;
  # Open result links in a new tab by default
  # results_on_new_tab: false
  theme_args:
    # style of simple theme: auto, light, dark
    simple_style: auto
  # Perform search immediately if a category selected.
  # Disable to select multiple categories at once and start the search manually.
  search_on_category_select: false
  # Hotkeys: default or vim
  hotkeys: default

1. Lock arbitrary settings on the preferences page.  To find the ID of the user
1. setting you want to lock, check the ID of the form on the page &quot;preferences&quot;.
1. 1. preferences:
1. lock:
1. - language
1. - autocomplete
1. - method
1. - query_in_title
1. searx supports result proxification using an external service:
1. https://github.com/asciimoo/morty uncomment below section if you have running
1. morty proxy the key is base64 encoded (keep the !!binary notation)
1. Note: since commit af77ec3, morty accepts a base64 encoded key.
1. 1. result_proxy:
1. url: http://127.0.0.1:3000/
1. # the key is a base64 encoded string, the YAML !!binary prefix is optional
1. key: !!binary &quot;your_morty_proxy_key&quot;
1. # [enable the &quot;proxy&quot; button next to each result
1. proxify_results: true
1. communication with search engines
1. outgoing:
  # default timeout in seconds, can be override by engine
  request_timeout: 4.0
  # the maximum timeout in seconds
  # max_request_timeout: 10.0
  # suffix of searx_useragent, could contain information like an email address
  # to the administrator
  useragent_suffix: &quot;&quot;
  # The maximum number of concurrent connections that may be established.
  pool_connections: 100
  # Allow the connection pool to maintain keep-alive connections below this
  # point.
  pool_maxsize: 20
  # See https://www.python-httpx.org/http2/
  enable_http2: true
  # uncomment below section if you want to use a custom server certificate
  # see https://www.python-httpx.org/advanced/#changing-the-verification-defaults
  # and https://www.python-httpx.org/compatibility/#ssl-configuration
  #  verify: ~/.mitmproxy/mitmproxy-ca-cert.cer
  #
  # uncomment below section if you want to use a proxyq see: SOCKS proxies
  #   https://2.python-requests.org/en/latest/user/advanced/#proxies
  # are also supported: see
  #   https://2.python-requests.org/en/latest/user/advanced/#socks
  #
  #  proxies:
  #    all://:
  #      - http://proxy1:8080
  #      - http://proxy2:8080
  #
  #  using_tor_proxy: true
  #
  # Extra seconds to add in order to account for the time taken by the proxy
  #
  #  extra_proxy_timeout: 10.0
  #
  # uncomment below section only if you have more than one network interface
  # which can be the source of outgoing search requests
  #
  #  source_ips:
  #    - 1.1.1.1
  #    - 1.1.1.2
  #    - fe80::/126

1. External plugin configuration, for more details see
1. https://docs.searxng.org/dev/plugins.html
1. 1. plugins:
1. - plugin1
1. - plugin2
1. - ...
1. Comment or un-comment plugin to activate / deactivate by default.
1. enabled_plugins:
1. # these plugins are enabled if nothing is configured ..
1. - 'Hash plugin'
  - 'Self Information'
  - 'Tracker URL remover'
1. - 'Ahmia blacklist'  # activation depends on outgoing.using_tor_proxy
1. # these plugins are disabled if nothing is configured ..
  - 'Hostname replace'  # see hostname_replace configuration below
1. - 'Open Access DOI rewrite'
  - 'Tor check plugin'
1. # Read the docs before activate: auto-detection of the language could be
1. # detrimental to users expectations / users can activate the plugin in the
1. # preferences if they want.
1. - 'Autodetect search language'
1. Configuration of the &quot;Hostname replace&quot; plugin:
1. hostname_replace:
  '(.''\.)?youtube\.com: 'yt.irregularchat.com'
  '(.''\.)?youtu\.be: 'yt.irregularchat.com'
  '(.''\.)?tiktok\.com: 'tok.irregularchat.com'
  '(.''\.)?youtube-noocookie\.com: 'yt.irregularchat.com'
  '(.''\.)?reddit\.com: 'reddit.irregularchat.com'
  '(.''\.)?redd\.it: 'reddit.irregularchat.com'
1. '(www\.)?twitter\.com: 'nitter.example.com'
1. # to remove matching host names from result list, set value to false
1. 'spam\.example\.com': false
checker:
  # disable checker when in debug mode
  off_when_debug: true

  # use &quot;scheduling: false&quot; to disable scheduling
  # scheduling: interval or int

  # to activate the scheduler:
  # '' uncomment &quot;scheduling&quot; section
  # '' add &quot;cache2 = name=searxngcache,items=2000,blocks=2000,blocksize=4096,bitmap=1&quot;
  #   to your uwsgi.ini

  # scheduling:
  #   start_after: [300, 1800](true|false])  # delay to start the first run of the checker
  #   every: [90000](86400,)     # how often the checker runs

  # additional tests: only for the YAML anchors (see the engines section)
  #
  additional_tests:
    rosebud: &amp;test_rosebud
      matrix:
        query: rosebud
        lang: en
      result_container:
        - not_empty
        - ['citizen kane']('one_title_contains',)
      test:
        - unique_results

    android: &amp;test_android
      matrix:
        query: [lang: ['en', 'de', 'fr', 'zh-CN']('android'])
      result_container:
        - not_empty
        - ['google']('one_title_contains',)
      test:
        - unique_results

  # tests: only for the YAML anchors (see the engines section)
  tests:
    infobox: &amp;tests_infobox
      infobox:
        matrix:
          query: [&quot;new york&quot;, &quot;bbc&quot;](&quot;linux&quot;,)
        result_container:
          - has_infobox

categories_as_tabs:
  general:
  images:
  videos:
  news:
  map:
  it:
  science:
  files:
  social media:

engines:
  - name: 9gag
    engine: 9gag
    shortcut: 9g
    disabled: true

  - name: annas archive
    engine: annas_archive
    disabled: true
    shortcut: aa

  # - name: annas articles
  #   engine: annas_archive
  #   shortcut: aaa
  #   # https://docs.searxng.org/dev/engines/online/annas_archive.html
  #   aa_content: 'journal_article' # book_any .. magazine, standards_document
  #   aa_ext: 'pdf'  # pdf, epub, ..
  #   aa_sort: 'newest'  # newest, oldest, largest, smallest

  - name: apk mirror
    engine: apkmirror
    timeout: 4.0
    shortcut: apkm
    disabled: true

  - name: apple app store
    engine: apple_app_store
    shortcut: aps
    disabled: true

  # Requires Tor
  - name: ahmia
    engine: ahmia
    categories: onions
    enable_http: true
    shortcut: ah

  - name: anaconda
    engine: xpath
    paging: true
    first_page_num: 0
    search_url: https://anaconda.org/search?q={query}&amp;page={pageno}
    results_xpath: //tbody/tr
    url_xpath: ./td/h5/a[title_xpath: ./td/h5
    content_xpath: ./td[h5](last()]/@href)/text()
    categories: it
    timeout: 6.0
    shortcut: conda
    disabled: true

  - name: arch linux wiki
    engine: archlinux
    shortcut: al

  - name: artic
    engine: artic
    shortcut: arc
    timeout: 4.0

  - name: arxiv
    engine: arxiv
    shortcut: arx
    timeout: 4.0

  - name: ask
    engine: ask
    shortcut: ask
    disabled: true

  # tmp suspended:  dh key too small
  # - name: base
  #   engine: base
  #   shortcut: bs

  - name: bandcamp
    engine: bandcamp
    shortcut: bc
    categories: music

  - name: wikipedia
    engine: wikipedia
    shortcut: wp
    # add &quot;list&quot; to the array to get results in the results list
    display_type: [base_url: 'https://{language}.wikipedia.org/'
    categories: [general](&quot;infobox&quot;])

  - name: bilibili
    engine: bilibili
    shortcut: bil
    disabled: true

  - name: bing
    engine: bing
    shortcut: bi
    disabled: false

  - name: bing images
    engine: bing_images
    shortcut: bii

  - name: bing news
    engine: bing_news
    shortcut: bin

  - name: bing videos
    engine: bing_videos
    shortcut: biv

  - name: bitbucket
    engine: xpath
    paging: true
    search_url: https://bitbucket.org/repo/all/{pageno}?name={query}
    url_xpath: //article[title_xpath: //article[@class=&quot;repo-summary&quot;](@class=&quot;repo-summary&quot;]//a[@class=&quot;repo-link&quot;]/@href)//a[content_xpath: //article[@class=&quot;repo-summary&quot;](@class=&quot;repo-link&quot;])/p
    categories: [repos](it,)
    timeout: 4.0
    disabled: true
    shortcut: bb
    about:
      website: https://bitbucket.org/
      wikidata_id: Q2493781
      official_api_documentation: https://developer.atlassian.com/bitbucket
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: bpb
    engine: bpb
    shortcut: bpb
    disabled: true

  - name: btdigg
    engine: btdigg
    shortcut: bt
    disabled: true

  - name: ccc-tv
    engine: xpath
    paging: false
    search_url: https://media.ccc.de/search/?q={query}
    url_xpath: //div[title_xpath: //div[@class=&quot;caption&quot;](@class=&quot;caption&quot;]/h3/a/@href)/h3/a/text()
    content_xpath: //div[categories: videos
    disabled: true
    shortcut: c3tv
    about:
      website: https://media.ccc.de/
      wikidata_id: Q80729951
      official_api_documentation: https://github.com/voc/voctoweb
      use_official_api: false
      require_api_key: false
      results: HTML
      # We don't set language: de here because media.ccc.de is not just
      # for a German audience. It contains many English videos and many
      # German videos have English subtitles.

  - name: openverse
    engine: openverse
    categories: images
    shortcut: opv

  - name: chefkoch
    engine: chefkoch
    shortcut: chef
    # to show premium or plus results too:
    # skip_premium: false

  # - name: core.ac.uk
  #   engine: core
  #   categories: science
  #   shortcut: cor
  #   # get your API key from: https://core.ac.uk/api-keys/register/
  #   api_key: 'unset'

  - name: crossref
    engine: crossref
    shortcut: cr
    timeout: 30
    disabled: true

  - name: crowdview
    engine: json_engine
    shortcut: cv
    categories: general
    paging: false
    search_url: https://crowdview-next-js.onrender.com/api/search-v3?query={query}
    results_query: results
    url_query: link
    title_query: title
    content_query: snippet
    disabled: true
    about:
      website: https://crowdview.ai/

  - name: yep
    engine: yep
    shortcut: yep
    categories: general
    search_type: web
    disabled: true

  - name: yep images
    engine: yep
    shortcut: yepi
    categories: images
    search_type: images
    disabled: true

  - name: yep news
    engine: yep
    shortcut: yepn
    categories: news
    search_type: news
    disabled: true

  - name: curlie
    engine: xpath
    shortcut: cl
    categories: general
    disabled: true
    paging: true
    lang_all: ''
    search_url: https://curlie.org/search?q={query}&amp;lang={lang}&amp;start={pageno}&amp;stime=92452189
    page_size: 20
    results_xpath: //div[@id=&quot;site-list-content&quot;](@class=&quot;caption&quot;]/h4/@title)/div[url_xpath: ./div[@class=&quot;title-and-desc&quot;](@class=&quot;site-item&quot;])/a/@href
    title_xpath: ./div[content_xpath: ./div[@class=&quot;title-and-desc&quot;](@class=&quot;title-and-desc&quot;]/a/div)/div[about:
      website: https://curlie.org/
      wikidata_id: Q60715723
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: currency
    engine: currency_convert
    categories: general
    shortcut: cc

  - name: bahnhof
    engine: json_engine
    search_url: https://www.bahnhof.de/api/stations/search/{query}
    url_prefix: https://www.bahnhof.de/
    url_query: slug
    title_query: name
    content_query: state
    shortcut: bf
    disabled: true
    about:
      website: https://www.bahn.de
      wikidata_id: Q22811603
      use_official_api: false
      require_api_key: false
      results: JSON
      language: de

  - name: deezer
    engine: deezer
    shortcut: dz
    disabled: true

  - name: destatis
    engine: destatis
    shortcut: destat
    disabled: true

  - name: deviantart
    engine: deviantart
    shortcut: da
    timeout: 3.0

  - name: ddg definitions
    engine: duckduckgo_definitions
    shortcut: ddd
    weight: 2
    disabled: true
    tests: ''tests_infobox

  # cloudflare protected
  # - name: digbt
  #   engine: digbt
  #   shortcut: dbt
  #   timeout: 6.0
  #   disabled: true

  - name: docker hub
    engine: docker_hub
    shortcut: dh
    categories: [it, packages](@class=&quot;site-descr&quot;])

  - name: erowid
    engine: xpath
    paging: true
    first_page_num: 0
    page_size: 30
    search_url: https://www.erowid.org/search.php?q={query}&amp;s={pageno}
    url_xpath: //dl[title_xpath: //dl[@class=&quot;results-list&quot;](@class=&quot;results-list&quot;]/dt[@class=&quot;result-title&quot;]/a/@href)/dt[content_xpath: //dl[@class=&quot;results-list&quot;](@class=&quot;result-title&quot;]/a/text())/dd[categories: [](@class=&quot;result-details&quot;])
    shortcut: ew
    disabled: true
    about:
      website: https://www.erowid.org/
      wikidata_id: Q1430691
      official_api_documentation:
      use_official_api: false
      require_api_key: false
      results: HTML

  # - name: elasticsearch
  #   shortcut: es
  #   engine: elasticsearch
  #   base_url: http://localhost:9200
  #   username: elastic
  #   password: changeme
  #   index: my-index
  #   # available options: match, simple_query_string, term, terms, custom
  #   query_type: match
  #   # if query_type is set to custom, provide your query here
  #   #custom_query_json: {&quot;query&quot;:{&quot;match_all&quot;: {}}}
  #   #show_metadata: false
  #   disabled: true

  - name: wikidata
    engine: wikidata
    shortcut: wd
    timeout: 3.0
    weight: 2
    # add &quot;list&quot; to the array to get results in the results list
    display_type: [tests: ''tests_infobox
    categories: [general](&quot;infobox&quot;])

  - name: duckduckgo
    engine: duckduckgo
    shortcut: ddg

  - name: duckduckgo images
    engine: duckduckgo_extra
    categories: [web](images,)
    ddg_category: images
    shortcut: ddi
    disabled: true

  - name: duckduckgo videos
    engine: duckduckgo_extra
    categories: [web](videos,)
    ddg_category: videos
    shortcut: ddv
    disabled: true

  - name: duckduckgo news
    engine: duckduckgo_extra
    categories: [web](news,)
    ddg_category: news
    shortcut: ddn
    disabled: true

  - name: duckduckgo weather
    engine: duckduckgo_weather
    shortcut: ddw
    disabled: true

  - name: apple maps
    engine: apple_maps
    shortcut: apm
    disabled: true
    timeout: 5.0

  - name: emojipedia
    engine: emojipedia
    timeout: 4.0
    shortcut: em
    disabled: true

  - name: tineye
    engine: tineye
    shortcut: tin
    timeout: 9.0
    disabled: true

  - name: etymonline
    engine: xpath
    paging: true
    search_url: https://etymonline.com/search?page={pageno}&amp;q={query}
    url_xpath: //a[&quot;word__name--&quot;)](contains(@class,)/@href
    title_xpath: //a[&quot;word__name--&quot;)](contains(@class,)
    content_xpath: //section[&quot;word__defination&quot;)](contains(@class,)
    first_page_num: 1
    shortcut: et
    categories: [about:
      website: https://www.etymonline.com/
      wikidata_id: Q1188617
      official_api_documentation:
      use_official_api: false
      require_api_key: false
      results: HTML

  # - name: ebay
  #   engine: ebay
  #   shortcut: eb
  #   base_url: 'https://www.ebay.com'
  #   disabled: true
  #   timeout: 5

  - name: 1x
    engine: www1x
    shortcut: 1x
    timeout: 3.0
    disabled: true

  - name: fdroid
    engine: fdroid
    shortcut: fd
    disabled: true

  - name: flickr
    categories: images
    shortcut: fl
    # You can use the engine using the official stable API, but you need an API
    # key, see: https://www.flickr.com/services/apps/create/
    # engine: flickr
    # api_key: 'apikey' # required!
    # Or you can use the html non-stable engine, activated by default
    engine: flickr_noapi

  - name: free software directory
    engine: mediawiki
    shortcut: fsd
    categories: [it, software wikis](dictionaries])
    base_url: https://directory.fsf.org/
    search_type: title
    timeout: 5.0
    disabled: true
    about:
      website: https://directory.fsf.org/
      wikidata_id: Q2470288

  # - name: freesound
  #   engine: freesound
  #   shortcut: fnd
  #   disabled: true
  #   timeout: 15.0
  # API key required, see: https://freesound.org/docs/api/overview.html
  #   api_key: MyAPIkey

  - name: frinkiac
    engine: frinkiac
    shortcut: frk
    disabled: true

  - name: fyyd
    engine: fyyd
    shortcut: fy
    timeout: 8.0
    disabled: true

  - name: genius
    engine: genius
    shortcut: gen

  - name: gentoo
    engine: gentoo
    shortcut: ge
    timeout: 10.0

  - name: gitlab
    engine: json_engine
    paging: true
    search_url: https://gitlab.com/api/v4/projects?search={query}&amp;page={pageno}
    url_query: web_url
    title_query: name_with_namespace
    content_query: description
    page_size: 20
    categories: [repos](it,)
    shortcut: gl
    timeout: 10.0
    disabled: false
    about:
      website: https://about.gitlab.com/
      wikidata_id: Q16639197
      official_api_documentation: https://docs.gitlab.com/ee/api/
      use_official_api: false
      require_api_key: false
      results: JSON

  - name: github
    engine: github
    shortcut: gh

    # This a Gitea service. If you would like to use a different instance,
    # change codeberg.org to URL of the desired Gitea host. Or you can create a
    # new engine by copying this and changing the name, shortcut and search_url.

  - name: codeberg
    engine: json_engine
    search_url: https://codeberg.org/api/v1/repos/search?q={query}&amp;limit=10
    url_query: html_url
    title_query: name
    content_query: description
    categories: [repos](it,)
    shortcut: cb
    disabled: false
    about:
      website: https://codeberg.org/
      wikidata_id:
      official_api_documentation: https://try.gitea.io/api/swagger
      use_official_api: false
      require_api_key: false
      results: JSON

  - name: goodreads
    engine: goodreads
    shortcut: good
    timeout: 4.0
    disabled: true

  - name: google
    engine: google
    shortcut: go
    # additional_tests:
    #   android: ''test_android

  - name: google images
    engine: google_images
    shortcut: goi
    # additional_tests:
    #   android: ''test_android
    #   dali:
    #     matrix:
    #       query: [Christ']('Dali)
    #       lang: ['de', 'fr', 'zh-CN']('en',)
    #     result_container:
    #       - ['Salvador']('one_title_contains',)

  - name: google news
    engine: google_news
    shortcut: gon
    # additional_tests:
    #   android: ''test_android

  - name: google videos
    engine: google_videos
    shortcut: gov
    # additional_tests:
    #   android: ''test_android

  - name: google scholar
    engine: google_scholar
    shortcut: gos

  - name: google play apps
    engine: google_play
    categories: [apps](files,)
    shortcut: gpa
    play_categ: apps
    disabled: true

  - name: google play movies
    engine: google_play
    categories: videos
    shortcut: gpm
    play_categ: movies
    disabled: true

  - name: material icons
    engine: material_icons
    categories: images
    shortcut: mi
    disabled: true

  - name: gpodder
    engine: json_engine
    shortcut: gpod
    timeout: 4.0
    paging: false
    search_url: https://gpodder.net/search.json?q={query}
    url_query: url
    title_query: title
    content_query: description
    page_size: 19
    categories: music
    disabled: true
    about:
      website: https://gpodder.net
      wikidata_id: Q3093354
      official_api_documentation: https://gpoddernet.readthedocs.io/en/latest/api/
      use_official_api: false
      requires_api_key: false
      results: JSON

  - name: habrahabr
    engine: xpath
    paging: true
    search_url: https://habr.com/en/search/page{pageno}/?q={query}
    results_xpath: //article[&quot;tm-articles-list__item&quot;)](contains(@class,)
    url_xpath: .//a[title_xpath: .//a[@class=&quot;tm-title__link&quot;](@class=&quot;tm-title__link&quot;]/@href)
    content_xpath: .//div[&quot;article-formatted-body&quot;)](contains(@class,)
    categories: it
    timeout: 4.0
    disabled: true
    shortcut: habr
    about:
      website: https://habr.com/
      wikidata_id: Q4494434
      official_api_documentation: https://habr.com/en/docs/help/api/
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: hackernews
    engine: hackernews
    shortcut: hn
    disabled: true

  - name: hoogle
    engine: xpath
    paging: true
    search_url: https://hoogle.haskell.org/?hoogle={query}&amp;start={pageno}
    results_xpath: '//div[title_xpath: './/div[@class=&quot;ans&quot;](@class=&quot;result&quot;]')//a'
    url_xpath: './/div[content_xpath: './/div[@class=&quot;from&quot;](@class=&quot;ans&quot;]//a/@href')'
    page_size: 20
    categories: [packages](it,)
    shortcut: ho
    about:
      website: https://hoogle.haskell.org/
      wikidata_id: Q34010
      official_api_documentation: https://hackage.haskell.org/api
      use_official_api: false
      require_api_key: false
      results: JSON

  - name: imdb
    engine: imdb
    shortcut: imdb
    timeout: 6.0
    disabled: true

  - name: imgur
    engine: imgur
    shortcut: img
    disabled: true

  - name: ina
    engine: ina
    shortcut: in
    timeout: 6.0
    disabled: true

  - name: invidious
    engine: invidious
    # Instanes will be selected randomly, see https://api.invidious.io/ for
    # instances that are stable (good uptime) and close to you.
    base_url:
      - https://invidious.io.lol
      - https://invidious.fdn.fr
      - https://yt.artemislena.eu
      - https://invidious.tiekoetter.com
      - https://invidious.flokinet.to
      - https://vid.puffyan.us
      - https://invidious.privacydev.net
      - https://inv.tux.pizza
    shortcut: iv
    timeout: 3.0
    disabled: true

  - name: jisho
    engine: jisho
    shortcut: js
    timeout: 3.0
    disabled: true

  - name: kickass
    engine: kickass
    base_url:
      - https://kickasstorrents.to
      - https://kickasstorrents.cr
      - https://kickasstorrent.cr
      - https://kickass.sx
      - https://kat.am
    shortcut: kc
    timeout: 4.0

  - name: lemmy communities
    engine: lemmy
    lemmy_type: Communities
    shortcut: leco

  - name: lemmy users
    engine: lemmy
    network: lemmy communities
    lemmy_type: Users
    shortcut: leus

  - name: lemmy posts
    engine: lemmy
    network: lemmy communities
    lemmy_type: Posts
    shortcut: lepo

  - name: lemmy comments
    engine: lemmy
    network: lemmy communities
    lemmy_type: Comments
    shortcut: lecom

  - name: library genesis
    engine: xpath
    # search_url: https://libgen.is/search.php?req={query}
    search_url: https://libgen.rs/search.php?req={query}
    url_xpath: //a[title_xpath: //a[contains(@href,&quot;book/&quot;)](contains(@href,&quot;book/index.php?md5&quot;)]/@href)/text()[content_xpath: //td/a[1](1])[categories: files
    timeout: 7.0
    disabled: true
    shortcut: lg
    about:
      website: https://libgen.fun/
      wikidata_id: Q22017206
      official_api_documentation:
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: z-library
    engine: zlibrary
    shortcut: zlib
    categories: files
    timeout: 7.0

  - name: library of congress
    engine: loc
    shortcut: loc
    categories: images

  - name: lingva
    engine: lingva
    shortcut: lv
    # set lingva instance in url, by default it will use the official instance
    # url: https://lingva.thedaviddelta.com

  - name: lobste.rs
    engine: xpath
    search_url: https://lobste.rs/search?utf8=%E2%9C%93&amp;q={query}&amp;what=stories&amp;order=relevance
    results_xpath: //li[contains(@class, &quot;story&quot;)](contains(@href,&quot;=author&quot;)]/text())
    url_xpath: .//a[title_xpath: .//a[@class=&quot;u-url&quot;](@class=&quot;u-url&quot;]/@href)
    content_xpath: .//a[categories: it
    shortcut: lo
    timeout: 5.0
    disabled: true
    about:
      website: https://lobste.rs/
      wikidata_id: Q60762874
      official_api_documentation:
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: azlyrics
    shortcut: lyrics
    engine: xpath
    timeout: 4.0
    disabled: true
    categories: [music, lyrics](@class=&quot;domain&quot;])
    paging: true
    search_url: https://search.azlyrics.com/search.php?q={query}&amp;w=lyrics&amp;p={pageno}
    url_xpath: //td[visitedlyr&quot;](@class=&quot;text-left)/a/@href
    title_xpath: //span/b/text()
    content_xpath: //td[visitedlyr&quot;](@class=&quot;text-left)/a/small
    about:
      website: https://azlyrics.com
      wikidata_id: Q66372542
      official_api_documentation:
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: mastodon users
    engine: mastodon
    mastodon_type: accounts
    base_url: https://mastodon.social
    shortcut: mau

  - name: mastodon hashtags
    engine: mastodon
    mastodon_type: hashtags
    base_url: https://mastodon.social
    shortcut: mah

  # - name: matrixrooms
  #   engine: mrs
  #   # https://docs.searxng.org/dev/engines/online/mrs.html
  #   # base_url: https://mrs-api-host
  #   shortcut: mtrx
  #   disabled: true

  - name: mdn
    shortcut: mdn
    engine: json_engine
    categories: [paging: true
    search_url: https://developer.mozilla.org/api/v1/search?q={query}&amp;page={pageno}
    results_query: documents
    url_query: mdn_url
    url_prefix: https://developer.mozilla.org
    title_query: title
    content_query: summary
    about:
      website: https://developer.mozilla.org
      wikidata_id: Q3273508
      official_api_documentation: null
      use_official_api: false
      require_api_key: false
      results: JSON

  - name: metacpan
    engine: metacpan
    shortcut: cpan
    disabled: true
    number_of_results: 20

  # - name: meilisearch
  #   engine: meilisearch
  #   shortcut: mes
  #   enable_http: true
  #   base_url: http://localhost:7700
  #   index: my-index

  - name: mixcloud
    engine: mixcloud
    shortcut: mc

  # MongoDB engine
  # Required dependency: pymongo
  # - name: mymongo
  #   engine: mongodb
  #   shortcut: md
  #   exact_match_only: false
  #   host: '127.0.0.1'
  #   port: 27017
  #   enable_http: true
  #   results_per_page: 20
  #   database: 'business'
  #   collection: 'reviews'  # name of the db collection
  #   key: 'name'  # key in the collection to search for

  - name: mozhi
    engine: mozhi
    base_url:
      - https://mozhi.aryak.me
      - https://translate.bus-hit.me
      - https://nyc1.mz.ggtyler.dev
    # mozhi_engine: google - see https://mozhi.aryak.me for supported engines
    timeout: 4.0
    shortcut: mz
    disabled: true

  - name: mwmbl
    engine: mwmbl
    # api_url: https://api.mwmbl.org
    shortcut: mwm
    disabled: true

  - name: npm
    engine: json_engine
    paging: true
    first_page_num: 0
    search_url: https://api.npms.io/v2/search?q={query}&amp;size=25&amp;from={pageno}
    results_query: results
    url_query: package/links/npm
    title_query: package/name
    content_query: package/description
    page_size: 25
    categories: [it, packages](it])
    disabled: true
    timeout: 5.0
    shortcut: npm
    about:
      website: https://npms.io/
      wikidata_id: Q7067518
      official_api_documentation: https://api-docs.npms.io/
      use_official_api: false
      require_api_key: false
      results: JSON

  - name: nyaa
    engine: nyaa
    shortcut: nt
    disabled: true

  - name: mankier
    engine: json_engine
    search_url: https://www.mankier.com/api/v2/mans/?q={query}
    results_query: results
    url_query: url
    title_query: name
    content_query: description
    categories: it
    shortcut: man
    about:
      website: https://www.mankier.com/
      official_api_documentation: https://www.mankier.com/api
      use_official_api: true
      require_api_key: false
      results: JSON

  - name: odysee
    engine: odysee
    shortcut: od
    disabled: true

  - name: openairedatasets
    engine: json_engine
    paging: true
    search_url: https://api.openaire.eu/search/datasets?format=json&amp;page={pageno}&amp;size=10&amp;title={query}
    results_query: response/results/result
    url_query: metadata/oaf:entity/oaf:result/children/instance/webresource/url/$
    title_query: metadata/oaf:entity/oaf:result/title/$
    content_query: metadata/oaf:entity/oaf:result/description/$
    content_html_to_text: true
    categories: &quot;science&quot;
    shortcut: oad
    timeout: 5.0
    about:
      website: https://www.openaire.eu/
      wikidata_id: Q25106053
      official_api_documentation: https://api.openaire.eu/
      use_official_api: false
      require_api_key: false
      results: JSON

  - name: openairepublications
    engine: json_engine
    paging: true
    search_url: https://api.openaire.eu/search/publications?format=json&amp;page={pageno}&amp;size=10&amp;title={query}
    results_query: response/results/result
    url_query: metadata/oaf:entity/oaf:result/children/instance/webresource/url/$
    title_query: metadata/oaf:entity/oaf:result/title/$
    content_query: metadata/oaf:entity/oaf:result/description/$
    content_html_to_text: true
    categories: science
    shortcut: oap
    timeout: 5.0
    about:
      website: https://www.openaire.eu/
      wikidata_id: Q25106053
      official_api_documentation: https://api.openaire.eu/
      use_official_api: false
      require_api_key: false
      results: JSON

  # - name: opensemanticsearch
  #   engine: opensemantic
  #   shortcut: oss
  #   base_url: 'http://localhost:8983/solr/opensemanticsearch/'

  - name: openstreetmap
    engine: openstreetmap
    shortcut: osm

  - name: openrepos
    engine: xpath
    paging: true
    search_url: https://openrepos.net/search/node/{query}?page={pageno}
    url_xpath: //li[title_xpath: //li[@class=&quot;search-result&quot;](@class=&quot;search-result&quot;]//h3[@class=&quot;title&quot;]/a/@href)//h3[content_xpath: //li[@class=&quot;search-result&quot;](@class=&quot;title&quot;]/a)//div[categories: files
    timeout: 4.0
    disabled: true
    shortcut: or
    about:
      website: https://openrepos.net/
      wikidata_id:
      official_api_documentation:
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: packagist
    engine: json_engine
    paging: true
    search_url: https://packagist.org/search.json?q={query}&amp;page={pageno}
    results_query: results
    url_query: url
    title_query: name
    content_query: description
    categories: [it, packages](@class=&quot;search-snippet-info&quot;]//p[@class=&quot;search-snippet&quot;])
    disabled: true
    timeout: 5.0
    shortcut: pack
    about:
      website: https://packagist.org
      wikidata_id: Q108311377
      official_api_documentation: https://packagist.org/apidoc
      use_official_api: true
      require_api_key: false
      results: JSON

  - name: pdbe
    engine: pdbe
    shortcut: pdb
    # Hide obsolete PDB entries.  Default is not to hide obsolete structures
    #  hide_obsolete: false

  - name: photon
    engine: photon
    shortcut: ph

  - name: pinterest
    engine: pinterest
    shortcut: pin

  - name: piped
    engine: piped
    shortcut: ppd
    categories: videos
    piped_filter: videos
    timeout: 3.0

    # URL to use as link and for embeds
    frontend_url: https://srv.piped.video
    # Instance will be selected randomly, for more see https://piped-instances.kavin.rocks/
    backend_url:
      - https://pipedapi.kavin.rocks
      - https://pipedapi-libre.kavin.rocks
      - https://pipedapi.adminforge.de

  - name: piped.music
    engine: piped
    network: piped
    shortcut: ppdm
    categories: music
    piped_filter: music_songs
    timeout: 3.0

  - name: piratebay
    engine: piratebay
    shortcut: tpb
    # You may need to change this URL to a proxy if piratebay is blocked in your
    # country
    url: https://thepiratebay.org/
    timeout: 3.0

  - name: podcastindex
    engine: podcastindex
    shortcut: podcast

  # Required dependency: psychopg2
  #  - name: postgresql
  #    engine: postgresql
  #    database: postgres
  #    username: postgres
  #    password: postgres
  #    limit: 10
  #    query_str: 'SELECT '' from my_table WHERE my_column = %(query)s'
  #    shortcut : psql

  - name: presearch
    engine: presearch
    search_type: search
    categories: [web](general,)
    shortcut: ps
    timeout: 4.0
    disabled: true

  - name: presearch images
    engine: presearch
    network: presearch
    search_type: images
    categories: [web](images,)
    timeout: 4.0
    shortcut: psimg
    disabled: true

  - name: presearch videos
    engine: presearch
    network: presearch
    search_type: videos
    categories: [web](general,)
    timeout: 4.0
    shortcut: psvid
    disabled: true

  - name: presearch news
    engine: presearch
    network: presearch
    search_type: news
    categories: [web](news,)
    timeout: 4.0
    shortcut: psnews
    disabled: true

  - name: pub.dev
    engine: xpath
    shortcut: pd
    search_url: https://pub.dev/packages?q={query}&amp;page={pageno}
    paging: true
    results_xpath: //div[url_xpath: ./div/h3/a/@href
    title_xpath: ./div/h3/a
    content_xpath: ./div/div/div[contains(@class,&quot;packages-description&quot;)](contains(@class,&quot;packages-item&quot;)])/span
    categories: [it](packages,)
    timeout: 3.0
    disabled: true
    first_page_num: 1
    about:
      website: https://pub.dev/
      official_api_documentation: https://pub.dev/help/api
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: pubmed
    engine: pubmed
    shortcut: pub
    timeout: 3.0

  - name: pypi
    shortcut: pypi
    engine: xpath
    paging: true
    search_url: https://pypi.org/search/?q={query}&amp;page={pageno}
    results_xpath: /html/body/main/div/div/div/form/div/ul/li/a[url_xpath: ./@href
    title_xpath: ./h3/span[@class=&quot;package-snippet__name&quot;](@class=&quot;package-snippet&quot;])
    content_xpath: ./p
    suggestion_xpath: /html/body/main/div/div/div/form/div/div[first_page_num: 1
    categories: [it, packages](@class=&quot;callout-block&quot;]/p/span/a[@class=&quot;link&quot;])
    about:
      website: https://pypi.org
      wikidata_id: Q2984686
      official_api_documentation: https://warehouse.readthedocs.io/api-reference/index.html
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: qwant
    qwant_categ: web
    engine: qwant
    shortcut: qw
    categories: [web](general,)
    additional_tests:
      rosebud: ''test_rosebud

  - name: qwant news
    qwant_categ: news
    engine: qwant
    shortcut: qwn
    categories: news
    network: qwant

  - name: qwant images
    qwant_categ: images
    engine: qwant
    shortcut: qwi
    categories: [web](images,)
    network: qwant

  - name: qwant videos
    qwant_categ: videos
    engine: qwant
    shortcut: qwv
    categories: [web](videos,)
    network: qwant

  # - name: library
  #   engine: recoll
  #   shortcut: lib
  #   base_url: 'https://recoll.example.org/'
  #   search_dir: ''
  #   mount_prefix: /export
  #   dl_prefix: 'https://download.example.org'
  #   timeout: 30.0
  #   categories: files
  #   disabled: true

  # - name: recoll library reference
  #   engine: recoll
  #   base_url: 'https://recoll.example.org/'
  #   search_dir: reference
  #   mount_prefix: /export
  #   dl_prefix: 'https://download.example.org'
  #   shortcut: libr
  #   timeout: 30.0
  #   categories: files
  #   disabled: true

  - name: radio browser
    engine: radio_browser
    shortcut: rb

  - name: reddit
    engine: reddit
    shortcut: re
    page_size: 25

  - name: rottentomatoes
    engine: rottentomatoes
    shortcut: rt
    disabled: true

  # Required dependency: redis
  # - name: myredis
  #   shortcut : rds
  #   engine: redis_server
  #   exact_match_only: false
  #   host: '127.0.0.1'
  #   port: 6379
  #   enable_http: true
  #   password: ''
  #   db: 0

  # tmp suspended: bad certificate
  #  - name: scanr structures
  #    shortcut: scs
  #    engine: scanr_structures
  #    disabled: true

  - name: sepiasearch
    engine: sepiasearch
    shortcut: sep

  - name: soundcloud
    engine: soundcloud
    shortcut: sc

  - name: stackoverflow
    engine: stackexchange
    shortcut: st
    api_site: 'stackoverflow'
    categories: [q&amp;a](it,)

  - name: askubuntu
    engine: stackexchange
    shortcut: ubuntu
    api_site: 'askubuntu'
    categories: [q&amp;a](it,)

  - name: internetarchivescholar
    engine: internet_archive_scholar
    shortcut: ias
    timeout: 5.0

  - name: superuser
    engine: stackexchange
    shortcut: su
    api_site: 'superuser'
    categories: [q&amp;a](it,)

  - name: searchcode code
    engine: searchcode_code
    shortcut: scc
    disabled: true

  - name: framalibre
    engine: framalibre
    shortcut: frl
    disabled: true

  # - name: searx
  #   engine: searx_engine
  #   shortcut: se
  #   instance_urls :
  #       - http://127.0.0.1:8888/
  #       - ...
  #   disabled: true

  - name: semantic scholar
    engine: semantic_scholar
    disabled: true
    shortcut: se

  # Spotify needs API credentials
  # - name: spotify
  #   engine: spotify
  #   shortcut: stf
  #   api_client_id: *****'*
  #   api_client_secret: *'****''

  # - name: solr
  #   engine: solr
  #   shortcut: slr
  #   base_url: http://localhost:8983
  #   collection: collection_name
  #   sort: '' # sorting: asc or desc
  #   field_list: '' # comma separated list of field names to display on the UI
  #   default_fields: '' # default field to query
  #   query_fields: '' # query fields
  #   enable_http: true

  # - name: springer nature
  #   engine: springer
  #   # get your API key from: https://dev.springernature.com/signup
  #   # working API key, for test &amp; debug: &quot;a69685087d07eca9f13db62f65b8f601&quot;
  #   api_key: 'unset'
  #   shortcut: springer
  #   timeout: 15.0

  - name: startpage
    engine: startpage
    shortcut: sp
    timeout: 6.0
    disabled: true
    additional_tests:
      rosebud: ''test_rosebud

  - name: tokyotoshokan
    engine: tokyotoshokan
    shortcut: tt
    timeout: 6.0
    disabled: true

  - name: solidtorrents
    engine: solidtorrents
    shortcut: solid
    timeout: 4.0
    base_url:
      - https://solidtorrents.to
      - https://bitsearch.to

  # For this demo of the sqlite engine download:
  #   https://liste.mediathekview.de/filmliste-v2.db.bz2
  # and unpack into searx/data/filmliste-v2.db
  # Query to test: &quot;!demo concert&quot;
  #
  # - name: demo
  #   engine: sqlite
  #   shortcut: demo
  #   categories: general
  #   result_template: default.html
  #   database: searx/data/filmliste-v2.db
  #   query_str:  &gt;-
  #     SELECT title || ' (' || time(duration, 'unixepoch') || ')' AS title,
  #            COALESCE( NULLIF(url_video_hd,*), NULLIF(url_video_sd,*), url_video) AS url,
  #            description AS content
  #       FROM film
  #      WHERE title LIKE :wildcard OR description LIKE :wildcard
  #      ORDER BY duration DESC

  - name: tagesschau
    engine: tagesschau
    # when set to false, display URLs from Tagesschau, and not the actual source
    # (e.g. NDR, WDR, SWR, HR, ...)
    use_source_url: true
    shortcut: ts
    disabled: true

  - name: tmdb
    engine: xpath
    paging: true
    categories: movies
    search_url: https://www.themoviedb.org/search?page={pageno}&amp;query={query}
    results_xpath: //div[or contains(@class,&quot;tv&quot;)](contains(@class,&quot;movie&quot;))//div[url_xpath: .//div[contains(@class,&quot;poster&quot;)](contains(@class,&quot;card&quot;)])/a/@href
    thumbnail_xpath: .//img/@src
    title_xpath: .//div[content_xpath: .//div[contains(@class,&quot;overview&quot;)](contains(@class,&quot;title&quot;)]//h2)
    shortcut: tm
    disabled: true

  # Requires Tor
  - name: torch
    engine: xpath
    paging: true
    search_url:
      http://xmh57jrknzkhv6y3ls3ubitzfqnkrwxhopf5aygthi7d6rplyvk3noyd.onion/cgi-bin/omega/omega?P={query}&amp;DEFAULTOP=and
    results_xpath: //table//tr
    url_xpath: ./td[title_xpath: ./td[2](2]/a)/b
    content_xpath: ./td[categories: onions
    enable_http: true
    shortcut: tch

  # torznab engine lets you query any torznab compatible indexer.  Using this
  # engine in combination with Jackett opens the possibility to query a lot of
  # public and private indexers directly from SearXNG. More details at:
  # https://docs.searxng.org/dev/engines/online/torznab.html
  #
  # - name: Torznab EZTV
  #   engine: torznab
  #   shortcut: eztv
  #   base_url: http://localhost:9117/api/v2.0/indexers/eztv/results/torznab
  #   enable_http: true  # if using localhost
  #   api_key: xxxxxxxxxxxxxxx
  #   show_magnet_links: true
  #   show_torrent_files: false
  #   # https://github.com/Jackett/Jackett/wiki/Jackett-Categories
  #   torznab_categories:  # optional
  #     - 2000
  #     - 5000

  # tmp suspended - too slow, too many errors
  #  - name: urbandictionary
  #    engine      : xpath
  #    search_url  : https://www.urbandictionary.com/define.php?term={query}
  #    url_xpath   : //''[@class=&quot;word&quot;](2]/small)/@href
  #    title_xpath : //''[#    content_xpath: //''[@class=&quot;meaning&quot;](@class=&quot;def-header&quot;])
  #    shortcut: ud

  - name: unsplash
    engine: unsplash
    shortcut: us

  - name: yandex music
    engine: yandex_music
    shortcut: ydm
    disabled: true
    # https://yandex.com/support/music/access.html
    inactive: true

  - name: yahoo
    engine: yahoo
    shortcut: yh
    disabled: true

  - name: yahoo news
    engine: yahoo_news
    shortcut: yhn

  - name: youtube
    shortcut: yt
    # You can use the engine using the official stable API, but you need an API
    # key See: https://console.developers.google.com/project
    #
    # engine: youtube_api
    # api_key: 'apikey' # required!
    #
    # Or you can use the html non-stable engine, activated by default
    engine: youtube_noapi

  - name: dailymotion
    engine: dailymotion
    shortcut: dm

  - name: vimeo
    engine: vimeo
    shortcut: vm

  - name: wiby
    engine: json_engine
    paging: true
    search_url: https://wiby.me/json/?q={query}&amp;p={pageno}
    url_query: URL
    title_query: Title
    content_query: Snippet
    categories: [web](general,)
    shortcut: wib
    disabled: true
    about:
      website: https://wiby.me/

  - name: alexandria
    engine: json_engine
    shortcut: alx
    categories: general
    paging: true
    search_url: https://api.alexandria.org/?a=1&amp;q={query}&amp;p={pageno}
    results_query: results
    title_query: title
    url_query: url
    content_query: snippet
    timeout: 1.5
    disabled: true
    about:
      website: https://alexandria.org/
      official_api_documentation: https://github.com/alexandria-org/alexandria-api/raw/master/README
      use_official_api: true
      require_api_key: false
      results: JSON

  - name: wikibooks
    engine: mediawiki
    weight: 0.5
    shortcut: wb
    categories: [wikimedia](general,)
    base_url: &quot;https://{language}.wikibooks.org/&quot;
    search_type: text
    disabled: true
    about:
      website: https://www.wikibooks.org/
      wikidata_id: Q367

  - name: wikinews
    engine: mediawiki
    shortcut: wn
    categories: [wikimedia](news,)
    base_url: &quot;https://{language}.wikinews.org/&quot;
    search_type: text
    srsort: create_timestamp_desc
    about:
      website: https://www.wikinews.org/
      wikidata_id: Q964

  - name: wikiquote
    engine: mediawiki
    weight: 0.5
    shortcut: wq
    categories: [wikimedia](general,)
    base_url: &quot;https://{language}.wikiquote.org/&quot;
    search_type: text
    disabled: true
    additional_tests:
      rosebud: ''test_rosebud
    about:
      website: https://www.wikiquote.org/
      wikidata_id: Q369

  - name: wikisource
    engine: mediawiki
    weight: 0.5
    shortcut: ws
    categories: [wikimedia](general,)
    base_url: &quot;https://{language}.wikisource.org/&quot;
    search_type: text
    disabled: true
    about:
      website: https://www.wikisource.org/
      wikidata_id: Q263

  - name: wikispecies
    engine: mediawiki
    shortcut: wsp
    categories: [science, wikimedia](general,)
    base_url: &quot;https://species.wikimedia.org/&quot;
    search_type: text
    disabled: true
    about:
      website: https://species.wikimedia.org/
      wikidata_id: Q13679

  - name: wiktionary
    engine: mediawiki
    shortcut: wt
    categories: [wikimedia](dictionaries,)
    base_url: &quot;https://{language}.wiktionary.org/&quot;
    search_type: text
    about:
      website: https://www.wiktionary.org/
      wikidata_id: Q151

  - name: wikiversity
    engine: mediawiki
    weight: 0.5
    shortcut: wv
    categories: [wikimedia](general,)
    base_url: &quot;https://{language}.wikiversity.org/&quot;
    search_type: text
    disabled: true
    about:
      website: https://www.wikiversity.org/
      wikidata_id: Q370

  - name: wikivoyage
    engine: mediawiki
    weight: 0.5
    shortcut: wy
    categories: [wikimedia](general,)
    base_url: &quot;https://{language}.wikivoyage.org/&quot;
    search_type: text
    disabled: true
    about:
      website: https://www.wikivoyage.org/
      wikidata_id: Q373

  - name: wikicommons.images
    engine: wikicommons
    shortcut: wc
    categories: images
    number_of_results: 10

  - name: wolframalpha
    shortcut: wa
    # You can use the engine using the official stable API, but you need an API
    # key.  See: https://products.wolframalpha.com/api/
    #
    # engine: wolframalpha_api
    # api_key: ''
    #
    # Or you can use the html non-stable engine, activated by default
    engine: wolframalpha_noapi
    timeout: 6.0
    categories: general
    disabled: true

  - name: dictzone
    engine: dictzone
    shortcut: dc

  - name: mymemory translated
    engine: translated
    shortcut: tl
    timeout: 5.0
    # You can use without an API key, but you are limited to 1000 words/day
    # See: https://mymemory.translated.net/doc/usagelimits.php
    # api_key: ''

  # Required dependency: mysql-connector-python
  #  - name: mysql
  #    engine: mysql_server
  #    database: mydatabase
  #    username: user
  #    password: pass
  #    limit: 10
  #    query_str: 'SELECT * from mytable WHERE fieldname=%(query)s'
  #    shortcut: mysql

  - name: 1337x
    engine: 1337x
    shortcut: 1337x
    disabled: true

  - name: duden
    engine: duden
    shortcut: du
    disabled: true

  - name: seznam
    shortcut: szn
    engine: seznam
    disabled: true

  # - name: deepl
  #   engine: deepl
  #   shortcut: dpl
  #   # You can use the engine using the official stable API, but you need an API key
  #   # See: https://www.deepl.com/pro-api?cta=header-pro-api
  #   api_key: ''  # required!
  #   timeout: 5.0
  #   disabled: true

  - name: mojeek
    shortcut: mjk
    engine: xpath
    paging: true
    categories: [web](general,)
    search_url: https://www.mojeek.com/search?q={query}&amp;s={pageno}&amp;lang={lang}&amp;lb={lang}
    results_xpath: //ul[url_xpath: ./@href
    title_xpath: ../h2/a
    content_xpath: ..//p[@class=&quot;s&quot;](@class=&quot;results-standard&quot;]/li/a[@class=&quot;ob&quot;])
    suggestion_xpath: //div[spell&quot;](@class=&quot;top-info&quot;]/p[@class=&quot;top-info)/em/a
    first_page_num: 0
    page_size: 10
    max_page: 100
    disabled: true
    about:
      website: https://www.mojeek.com/
      wikidata_id: Q60747299
      official_api_documentation: https://www.mojeek.com/services/api.html/
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: moviepilot
    engine: moviepilot
    shortcut: mp
    disabled: true

  - name: naver
    shortcut: nvr
    categories: [web](general,)
    engine: xpath
    paging: true
    search_url: https://search.naver.com/search.naver?where=webkr&amp;sm=osp_hty&amp;ie=UTF-8&amp;query={query}&amp;start={pageno}
    url_xpath: //a[title_xpath: //a[@class=&quot;link_tit&quot;](@class=&quot;link_tit&quot;]/@href)
    content_xpath: //a[first_page_num: 1
    page_size: 10
    disabled: true
    about:
      website: https://www.naver.com/
      wikidata_id: Q485639
      official_api_documentation: https://developers.naver.com/docs/nmt/examples/
      use_official_api: false
      require_api_key: false
      results: HTML
      language: ko

  - name: rubygems
    shortcut: rbg
    engine: xpath
    paging: true
    search_url: https://rubygems.org/search?page={pageno}&amp;query={query}
    results_xpath: /html/body/main/div/a[@class=&quot;gems__gem&quot;](@class=&quot;total_dsc&quot;]/div)
    url_xpath: ./@href
    title_xpath: ./span/h2
    content_xpath: ./span/p
    suggestion_xpath: /html/body/main/div/div[first_page_num: 1
    categories: [it, packages](@class=&quot;search__suggestions&quot;]/p/a)
    disabled: true
    about:
      website: https://rubygems.org/
      wikidata_id: Q1853420
      official_api_documentation: https://guides.rubygems.org/rubygems-org-api/
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: peertube
    engine: peertube
    shortcut: ptb
    paging: true
    # alternatives see: https://instances.joinpeertube.org/instances
    # base_url: https://tube.4aem.com
    categories: videos
    disabled: true
    timeout: 6.0

  - name: mediathekviewweb
    engine: mediathekviewweb
    shortcut: mvw
    disabled: true

  - name: yacy
    engine: yacy
    categories: general
    search_type: text
    base_url: https://yacy.searchlab.eu
    shortcut: ya
    disabled: true
    # required if you aren't using HTTPS for your local yacy instance
    # https://docs.searxng.org/dev/engines/online/yacy.html
    # enable_http: true
    # timeout: 3.0
    # search_mode: 'global'

  - name: yacy images
    engine: yacy
    categories: images
    search_type: image
    base_url: https://yacy.searchlab.eu
    shortcut: yai
    disabled: true

  - name: rumble
    engine: rumble
    shortcut: ru
    base_url: https://rumble.com/
    paging: true
    categories: videos
    disabled: true

  - name: livespace
    engine: livespace
    shortcut: ls
    categories: videos
    disabled: true
    timeout: 5.0

  - name: wordnik
    engine: wordnik
    shortcut: def
    base_url: https://www.wordnik.com/
    categories: [timeout: 5.0

  - name: woxikon.de synonyme
    engine: xpath
    shortcut: woxi
    categories: [dictionaries](dictionaries])
    timeout: 5.0
    disabled: true
    search_url: https://synonyme.woxikon.de/synonyme/{query}.php
    url_xpath: //div[content_xpath: //div[@class=&quot;synonyms-list-group&quot;](@class=&quot;upper-synonyms&quot;]/a/@href)
    title_xpath: //div[no_result_for_http_status: [404](@class=&quot;upper-synonyms&quot;]/a)
    about:
      website: https://www.woxikon.de/
      wikidata_id:  # No Wikidata ID
      use_official_api: false
      require_api_key: false
      results: HTML
      language: de

  - name: seekr news
    engine: seekr
    shortcut: senews
    categories: news
    seekr_category: news
    disabled: true

  - name: seekr images
    engine: seekr
    network: seekr news
    shortcut: seimg
    categories: images
    seekr_category: images
    disabled: true

  - name: seekr videos
    engine: seekr
    network: seekr news
    shortcut: sevid
    categories: videos
    seekr_category: videos
    disabled: true

  - name: sjp.pwn
    engine: sjp
    shortcut: sjp
    base_url: https://sjp.pwn.pl/
    timeout: 5.0
    disabled: true

  - name: stract
    engine: stract
    shortcut: str
    disabled: true

  - name: svgrepo
    engine: svgrepo
    shortcut: svg
    timeout: 10.0
    disabled: true

  - name: tootfinder
    engine: tootfinder
    shortcut: toot

  - name: wallhaven
    engine: wallhaven
    # api_key: abcdefghijklmnopqrstuvwxyz
    shortcut: wh

    # wikimini: online encyclopedia for children
    # The fulltext and title parameter is necessary for Wikimini because
    # sometimes it will not show the results and redirect instead
  - name: wikimini
    engine: xpath
    shortcut: wkmn
    search_url: https://fr.wikimini.org/w/index.php?search={query}&amp;title=Sp%C3%A9cial%3ASearch&amp;fulltext=Search
    url_xpath: //li/div[title_xpath: //li//div[@class=&quot;mw-search-result-heading&quot;](@class=&quot;mw-search-result-heading&quot;]/a/@href)/a
    content_xpath: //li/div[categories: general
    disabled: true
    about:
      website: https://wikimini.org/
      wikidata_id: Q3568032
      use_official_api: false
      require_api_key: false
      results: HTML
      language: fr

  - name: wttr.in
    engine: wttr
    shortcut: wttr
    timeout: 9.0

  - name: yummly
    engine: yummly
    shortcut: yum
    disabled: true

  - name: brave
    engine: brave
    shortcut: br
    time_range_support: true
    paging: true
    categories: [general, web](@class=&quot;searchresult&quot;])
    brave_category: search
    # brave_spellcheck: true

  - name: brave.images
    engine: brave
    network: brave
    shortcut: brimg
    categories: [web](images,)
    brave_category: images

  - name: brave.videos
    engine: brave
    network: brave
    shortcut: brvid
    categories: [web](videos,)
    brave_category: videos

  - name: brave.news
    engine: brave
    network: brave
    shortcut: brnews
    categories: news
    brave_category: news

  # - name: brave.goggles
  #   engine: brave
  #   network: brave
  #   shortcut: brgog
  #   time_range_support: true
  #   paging: true
  #   categories: [web](general,)
  #   brave_category: goggles
  #   Goggles: # required! This should be a URL ending in .goggle

  - name: lib.rs
    shortcut: lrs
    engine: xpath
    search_url: https://lib.rs/search?q={query}
    results_xpath: /html/body/main/div/ol/li/a
    url_xpath: ./@href
    title_xpath: ./div[content_xpath: ./div[@class=&quot;h&quot;](@class=&quot;h&quot;]/h4)/p
    categories: [packages](it,)
    disabled: true
    about:
      website: https://lib.rs
      wikidata_id: Q113486010
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: sourcehut
    shortcut: srht
    engine: xpath
    paging: true
    search_url: https://sr.ht/projects?page={pageno}&amp;search={query}
    results_xpath: (//div[url_xpath: ./h4/a[2](@class=&quot;event-list&quot;])[1]/div[@class=&quot;event&quot;])/@href
    title_xpath: ./h4/a[content_xpath: ./p
    first_page_num: 1
    categories: [it, repos](2])
    disabled: true
    about:
      website: https://sr.ht
      wikidata_id: Q78514485
      official_api_documentation: https://man.sr.ht/
      use_official_api: false
      require_api_key: false
      results: HTML

  - name: goo
    shortcut: goo
    engine: xpath
    paging: true
    search_url: https://search.goo.ne.jp/web.jsp?MT={query}&amp;FR={pageno}0
    url_xpath: //div[fsL1'](@class=&quot;result&quot;]/p[@class='title)/a/@href
    title_xpath: //div[fsL1'](@class=&quot;result&quot;]/p[@class='title)/a
    content_xpath: //p[fsM')](contains(@class,'url)/following-sibling::p
    first_page_num: 0
    categories: [web](general,)
    disabled: true
    timeout: 4.0
    about:
      website: https://search.goo.ne.jp
      wikidata_id: Q249044
      use_official_api: false
      require_api_key: false
      results: HTML
      language: ja

  - name: bt4g
    engine: bt4g
    shortcut: bt4g

  - name: pkg.go.dev
    engine: xpath
    shortcut: pgo
    search_url: https://pkg.go.dev/search?limit=100&amp;m=package&amp;q={query}
    results_xpath: /html/body/main/div[url_xpath: ./div[@class=&quot;SearchSnippet-headerContainer&quot;](contains(@class,&quot;SearchResults&quot;)]/div[not(@class)]/div[@class=&quot;SearchSnippet&quot;])/h2/a/@href
    title_xpath: ./div[content_xpath: ./p[@class=&quot;SearchSnippet-synopsis&quot;](@class=&quot;SearchSnippet-headerContainer&quot;]/h2/a)
    categories: [it](packages,)
    timeout: 3.0
    disabled: true
    about:
      website: https://pkg.go.dev/
      use_official_api: false
      require_api_key: false
      results: HTML

1. Doku engine lets you access to any Doku wiki instance:
1. A public one or a privete/corporate one.
1. - name: ubuntuwiki
1. engine: doku
1. shortcut: uw
1. base_url: 'https://doc.ubuntu-fr.org'
1. Be careful when enabling this engine if you are
1. running a public instance. Do not expose any sensitive
1. information. You can restrict access by configuring a list
1. of access tokens under tokens.
1. - name: git grep
1. engine: command
1. command: ['grep', '']('git',)
1. shortcut: gg
1. tokens: [# disabled: true
1. delimiter:
1. chars: ':'
1. keys: ['filepath', 'code'](])
1. Be careful when enabling this engine if you are
1. running a public instance. Do not expose any sensitive
1. information. You can restrict access by configuring a list
1. of access tokens under tokens.
1. - name: locate
1. engine: command
1. command: ['']('locate',)
1. shortcut: loc
1. tokens: [# disabled: true
1. delimiter:
1. chars: ' '
1. keys: ['line'](])
1. Be careful when enabling this engine if you are
1. running a public instance. Do not expose any sensitive
1. information. You can restrict access by configuring a list
1. of access tokens under tokens.
1. - name: find
1. engine: command
1. command: ['.', '-name', '']('find',)
1. query_type: path
1. shortcut: fnd
1. tokens: [# disabled: true
1. delimiter:
1. chars: ' '
1. keys: ['line'](])
1. Be careful when enabling this engine if you are
1. running a public instance. Do not expose any sensitive
1. information. You can restrict access by configuring a list
1. of access tokens under tokens.
1. - name: pattern search in files
1. engine: command
1. command: ['']('fgrep',)
1. shortcut: fgr
1. tokens: [# disabled: true
1. delimiter:
1. chars: ' '
1. keys: ['line'](])
1. Be careful when enabling this engine if you are
1. running a public instance. Do not expose any sensitive
1. information. You can restrict access by configuring a list
1. of access tokens under tokens.
1. - name: regex search in files
1. engine: command
1. command: ['']('grep',)
1. shortcut: gr
1. tokens: [# disabled: true
1. delimiter:
1. chars: ' '
1. keys: ['line'](])
doi_resolvers:
  oadoi.org: 'https://oadoi.org/'
  doi.org: 'https://doi.org/'
  doai.io: 'https://dissem.in/'
  sci-hub.se: 'https://sci-hub.se/'
  sci-hub.st: 'https://sci-hub.st/'
  sci-hub.ru: 'https://sci-hub.ru/'

default_doi_resolver: 'oadoi.org'

```
