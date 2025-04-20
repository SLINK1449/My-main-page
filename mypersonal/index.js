document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll('.section-container');
    
    windows.forEach(window => {
        const header = window.querySelector('.window-controls');
        let isDragging = false;
        let currentX = 0;
        let currentY = 0;
        let initialX = 0;
        let initialY = 0;

        header.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        function startDrag(e) {
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;
            
            if (e.target === header || header.contains(e.target)) {
                isDragging = true;
                window.style.cursor = 'grabbing';
                window.style.transition = 'none';
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                window.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        }

        function stopDrag() {
            isDragging = false;
            window.style.cursor = 'grab';
            window.style.transition = 'transform 0.2s ease';
        }
    });

    // Basic Chat Functionality
    const chatInput = document.getElementById('userInput');
    const chatHistory = document.getElementById('chatHistory');

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            // Add user message
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-message';
            userDiv.textContent = chatInput.value;
            chatHistory.appendChild(userDiv);

            // Add bot response
            setTimeout(() => {
                const botDiv = document.createElement('div');
                botDiv.className = 'message bot-message';
                botDiv.textContent = "I'm a simple demo bot. For real functionality, connect me to an AI service!";
                chatHistory.appendChild(botDiv);
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 1000);

            chatInput.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    });
});