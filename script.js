
document.getElementById('upload').addEventListener('change', () => {
    const files = document.getElementById('upload').files;
    if (files.length === 0) {
        console.log('No files selected');
        return;
    }

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                Tesseract.recognize(
                    img,
                    'eng',
                    {
                        logger: m => console.log(m)
                    }
                ).then(({ data: { text } }) => {
                    console.log(text);
                });
            };
        };
        reader.readAsDataURL(file);
    });
});
  