document.addEventListener("DOMContentLoaded", function() {
    // Handle clicks on non-collapsible sidebar items
    const navItems = document.querySelectorAll('.sidebar li:not(.collapsible)');
    navItems.forEach(item => {
        item.addEventListener('click', event => {
            const targetId = event.target.getAttribute('data-target');
            toggleContent(targetId);
        });
    });

    // Handle clicks on the arrow or the ARC Guidelines text
    document.querySelector('.sidebar').addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('arrow') || target.classList.contains('arc-guidelines')) {
            const collapsible = target.closest('.collapsible');
            toggleCollapsible(collapsible);
            // Show the ARC Guidelines content if not already displayed
            if (!collapsible.classList.contains('active')) {
                toggleContent('arc-guidelines-content');
            }
            event.stopPropagation(); // Prevent further propagation of the event
        }
    });

    // Start the ARC Form button click handler
    document.querySelector('.start-button').addEventListener('click', function() {
        toggleContent('arc-guidelines-content');
    });

    // Handle clicks on 'next-button' and 'prev-button' elements
    const navigationButtons = document.querySelectorAll('.next-button, .prev-button');
    navigationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            toggleContent(targetId);
        });
    });

    function toggleContent(targetId) {
        // Hide all content sections
        document.querySelectorAll('.content-div').forEach(div => {
            div.style.display = 'none';
        });

        // Show the targeted content section if it exists
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.style.display = 'block';
        }

        // If we're showing the ARC Guidelines, mark it as active
        if (targetId === 'arc-guidelines-content') {
            document.querySelector('.arc-guidelines').closest('.collapsible').classList.add('active');
        } else {
            document.querySelector('.arc-guidelines').closest('.collapsible').classList.remove('active');
        }
    }

    function toggleCollapsible(collapsible) {
        const content = collapsible.querySelector('.content');
        const arrow = collapsible.querySelector('.arrow');
        if (content.style.display === 'block') {
            content.style.display = 'none';
            arrow.textContent = '\u25BC'; // Change to down arrow
            collapsible.classList.remove('active');
        } else {
            content.style.display = 'block';
            arrow.textContent = '\u25B2'; // Change to up arrow
            collapsible.classList.add('active');
        }
    }

    // Initially show the welcome content
    toggleContent('welcome-content');
});
