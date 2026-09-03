(function () {
    "use strict";

    const internalHosts = new Set([
        window.location.hostname,
        "wang-jikai.github.io",
        "www.wang-jikai.github.io"
    ]);

    function openExternalLinksInNewTabs() {
        document.querySelectorAll("a[href]").forEach(function (link) {
            let url;

            try {
                url = new URL(link.getAttribute("href"), document.baseURI);
            } catch (error) {
                return;
            }

            const isWebLink = url.protocol === "http:" || url.protocol === "https:";

            if (!isWebLink || internalHosts.has(url.hostname)) {
                return;
            }

            link.target = "_blank";

            const relValues = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
            relValues.add("noopener");
            relValues.add("noreferrer");
            link.setAttribute("rel", Array.from(relValues).join(" "));
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", openExternalLinksInNewTabs);
    } else {
        openExternalLinksInNewTabs();
    }
}());
