// Shared site footer. Edit this block once to update every page.
document.addEventListener('DOMContentLoaded', function() {
    const footerContent = `
        <div class="container">
            <hr class="content-divider" aria-hidden="true">
        </div>
        <div class="footer-below">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        2026 &copy; Jikai Wang
                    </div>
                </div>
            </div>
        </div>
    `;

    const footerElement = document.querySelector('.site-footer');
    if (footerElement) {
        footerElement.innerHTML = footerContent;
    }
});
