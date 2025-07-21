(function () {
    // Store original console methods
    const originalConsoleError = console.error;
    const originalConsoleLog = console.log;

    // Create notification container
    const notificationContainer = document.getElementById('error-notifications-container');

    // Function to create and append notification div
    function createNotification(message, className) {
        const notification = document.createElement('div');
        notification.className = className; // Use a class to style the notification
        notification.textContent = message; // Add the message
        notificationContainer.appendChild(notification); // Append to container

        // Remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notificationContainer.removeChild(notification);
            }
        }, 5000);
    }

    // Override console.error
    console.error = function (...args) {
        // Call the original console.error
        originalConsoleError.apply(console, args);

        // Create and display error notification
        const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
        createNotification(message, 'error-notification');
    };

    // Override console.log
    console.log = function (...args) {
        // Call the original console.log
        originalConsoleLog.apply(console, args);

        // Create and display log notification
        const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
        createNotification(message, 'log-notification');
    };
})();
