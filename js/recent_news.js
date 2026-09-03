// Recent News data and renderer.
//
// Add new items to the array below. Dates use YYYY-MM-DD and are sorted
// automatically, so entries do not have to be inserted in a specific position.
//
// Publication example:
// {
//     type: 'publication',
//     date: '2026-01-01',
//     title: 'Paper title',
//     paperUrl: 'https://example.com/paper',
//     venue: 'Conference 2026',
//     venueUrl: 'https://example.com/conference',
//     detail: 'Poster',          // Optional: Poster, Oral, Best Paper, IF: 10, etc.
//     emphasizeDetail: false     // Set true to display the detail in bold.
// },
//
// General news example (content may contain links):
// {
//     type: 'general',
//     date: '2026-01-01',
//     content: 'I started a new position at <a href="https://example.com">Example</a>.'
// },

(function () {
    'use strict';

    const recentNews = [
        {
            type: 'publication',
            date: '2026-05-08',
            title: 'Wind power forecast uncertainty co-varies across Korean regions through asymmetric heavy-tailed connectedness networks',
            paperUrl: 'https://www.nature.com/articles/s43247-026-03716-4',
            venue: 'Communications Earth & Environment',
            venueUrl: 'https://www.nature.com/commsenv/'
            // To show the impact factor, add a line above like:  detail: 'IF: 8.9'
            // (put a comma after venueUrl first, then fill in the real number)
        },
       {
            type: 'general',
            date: '2026-02-28',
            content: 'I started a new position as a researcher at <a href="https://www.encoredtech.com/en">ENCORED Inc.</a>'
       },
       {
            type: 'general',
            date: '2026-02-20',
            content: 'I obtained the M.E. degree of <a href="https://www.kaist.ac.kr/en/">KAIST</a>.'
       }
    ];

    function createLink(text, url) {
        if (!url) {
            return document.createTextNode(text);
        }

        const link = document.createElement('a');
        link.href = url;
        link.textContent = text;
        return link;
    }

    function formatDate(date) {
        const parts = date.split('-');
        return parts[1] + '/' + parts[2] + '/' + parts[0] + '.';
    }

    function renderPublication(item, container) {
        container.appendChild(document.createTextNode('Paper "'));
        container.appendChild(createLink(item.title, item.paperUrl));
        container.appendChild(document.createTextNode('" was accepted at '));
        container.appendChild(createLink(item.venue, item.venueUrl));

        if (item.detail) {
            container.appendChild(document.createTextNode(' ('));
            if (item.emphasizeDetail) {
                const emphasis = document.createElement('strong');
                emphasis.textContent = item.detail;
                container.appendChild(emphasis);
            } else {
                container.appendChild(document.createTextNode(item.detail));
            }
            container.appendChild(document.createTextNode(')'));
        }

        container.appendChild(document.createTextNode('.'));
    }

    function renderNews() {
        const initialNewsCount = 30;
        const newsList = document.getElementById('recent-news-list');
        const newsToggle = document.getElementById('recent-news-toggle');
        if (!newsList || !newsToggle) {
            return;
        }

        const sortedNews = recentNews
            .slice()
            .sort(function (a, b) { return b.date.localeCompare(a.date); });
        let isExpanded = false;

        function renderItems() {
            const visibleNews = isExpanded ? sortedNews : sortedNews.slice(0, initialNewsCount);
            newsList.innerHTML = '';

            visibleNews.forEach(function (item) {
                const article = document.createElement('article');
                article.className = 'news-item';

                const date = document.createElement('time');
                date.className = 'news-date';
                date.dateTime = item.date;
                date.textContent = formatDate(item.date);

                const content = document.createElement('div');
                content.className = 'news-content';

                if (item.type === 'publication') {
                    renderPublication(item, content);
                } else {
                    content.innerHTML = item.content;
                }

                article.appendChild(date);
                article.appendChild(content);
                newsList.appendChild(article);
            });

            const hiddenNewsCount = sortedNews.length - initialNewsCount;
            newsToggle.hidden = hiddenNewsCount <= 0;
            newsToggle.setAttribute('aria-expanded', String(isExpanded));
            newsToggle.textContent = isExpanded ? 'Show Less' : 'Show More';
        }

        newsToggle.addEventListener('click', function () {
            isExpanded = !isExpanded;
            renderItems();
        });

        renderItems();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderNews);
    } else {
        renderNews();
    }
}());
