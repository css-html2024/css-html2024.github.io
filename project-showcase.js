document.addEventListener('DOMContentLoaded', () => {
    fetch('project-showcase.js')
        .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load Project Index: ${response.statusText}`);
        }
        return response.json();
        })
        .then(data => {
        CreateShowcase(data);
        })
        .catch(error => console.error('Error creating showcase:', error));
    });

function CreateShowcase(data) {
    
}