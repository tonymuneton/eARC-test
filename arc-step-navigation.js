document.addEventListener("DOMContentLoaded", function () {
    // Function to show a specific section
    function showSection(sectionId) {
        console.log('Showing section:', sectionId); // Debugging line
        // Hide all steps in the ARC 1 content
        document.querySelectorAll('#arc-1-content .form-step').forEach(function (section) {
            section.style.display = 'none';
        });
        // Show the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        } else {
            console.log('No section found for ID:', sectionId); // Debugging line
        }
    }

    // Event listeners for 'Continue' and 'Back' buttons
    document.querySelectorAll('#arc-1-content .arc1-next-button, #arc-1-content .arc1-prev-button').forEach(function (button) {
        button.addEventListener('click', function () {
            // Determine which button was clicked and get the respective target step
            const targetStep = button.getAttribute('data-next') || button.getAttribute('data-prev');
            showSection(targetStep);
        });
    });

    // Initially show the first step
    showSection('step1');
});
