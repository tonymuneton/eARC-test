document.addEventListener("DOMContentLoaded", function() {
    // Update active navigation item
    function updateActiveNavItem(targetId) {
        // Remove active class from all items
        document.querySelectorAll('.sidebar li').forEach(item => {
            item.classList.remove('active');
        });
        // Add active class to the current item
        const activeItem = document.querySelector(`.sidebar li[data-target="${targetId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            // Expand the parent collapsible menu if it exists
            const parentCollapsible = activeItem.closest('.collapsible');
            if (parentCollapsible && !parentCollapsible.classList.contains('active')) {
                toggleCollapsible(parentCollapsible);
            }
        }
    }

    // Handle clicks on non-collapsible sidebar items
    const navItems = document.querySelectorAll('.sidebar li:not(.collapsible)');
    navItems.forEach(item => {
        item.addEventListener('click', event => {
            const targetId = event.target.getAttribute('data-target');
            toggleContent(targetId);
            updateActiveNavItem(targetId);
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
                updateActiveNavItem('arc-guidelines-content');
            }
            event.stopPropagation(); // Prevent further propagation of the event
        }
    });

   // Start the ARC Form button click handler
document.querySelector('.start-button').addEventListener('click', function() {
    toggleContent('arc-guidelines-content');
    // Set the 'ARC Guidelines' as active in the sidebar
    setActiveSidebarItem('arc-guidelines-content');
});

function setActiveSidebarItem(targetId) {
    // Remove active class from all items
    document.querySelectorAll('.sidebar li').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to the 'ARC Guidelines' menu and the current sub-item
    let targetItem = document.querySelector(`.sidebar li[data-target="${targetId}"]`);
    let parentCollapsibleItem = document.querySelector('.arc-guidelines').closest('.collapsible');

    if (targetItem) {
        targetItem.classList.add('active');
    }

    if (parentCollapsibleItem && !parentCollapsibleItem.classList.contains('active')) {
        toggleCollapsible(parentCollapsibleItem);
    }
}


    // Handle clicks on 'next-button' and 'prev-button' elements
    const navigationButtons = document.querySelectorAll('.next-button, .prev-button');
    navigationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            toggleContent(targetId);
            updateActiveNavItem(targetId);
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

        // Update the active state in the navigation
        updateActiveNavItem(targetId);
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
