document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('studentForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const studentId = document.getElementById('studentId').value;

        if (!studentId.match(/^\d{4}$/)) {
            alert('الرجاء إدخال رقم جامعي صحيح مكون من 4 أرقام');
            return;
        }


        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.style.opacity = '0.8';


        setTimeout(function () {
            window.location.href = `student.html?id=${studentId}`;
        }, 300);
    });
});