document.addEventListener('DOMContentLoaded', function () {

    let studentsData = {};


    fetch('students1.json')
        .then(response => response.json())
        .then(data => {

            data.forEach(student => {
                studentsData[student.SID] = {
                    name: student.name.trim(),
                    sid: student.SID.toString(),
                    rank: student.rank,
                    avg: student.AVG.toFixed(2),
                    semester1: {
                        NA1: student.NA1,
                        P3: student.P3,
                        P: student.P,
                        LP: student.LP,
                        L3: student.L3,
                        EL: student.EL,
                        C3: student.C3,
                        AVG1: student.AVG1.toFixed(2)
                    },
                    semester2: {
                        AG1: student.AG1,
                        L4: student.L4,
                        ST: student.ST,
                        LO: student.LO,
                        C4: student.C4,
                        NA2: student.NA2,
                        MH: student.MH,
                        AVG2: student.AVG2.toFixed(2)
                    }
                };
            });


            processStudentData(studentsData);
        });

    function processStudentData(studentsData) {

        const urlParams = new URLSearchParams(window.location.search);
        const studentId = urlParams.get('id');

        if (!studentId) {
            alert('لم يتم تحديد رقم جامعي');
            window.location.href = 'index.html';
            return;
        }

        const student = studentsData[studentId];

        if (!student) {
            alert('الرقم الجامعي غير موجود');
            window.location.href = 'index.html';
            return;
        }


        document.getElementById('studentName').textContent = student.name;
        document.getElementById('studentSID').textContent = student.sid;
        document.getElementById('studentRank').textContent = student.rank;
        document.getElementById('studentAvg').textContent = student.avg;


        const tableBody = document.getElementById('gradesTableBody');


        const sem1Keys = Object.keys(student.semester1).filter(key => key !== 'AVG1');
        const sem2Keys = Object.keys(student.semester2).filter(key => key !== 'AVG2');
        const maxRows = Math.max(sem1Keys.length, sem2Keys.length);


        const courseNames = {
            NA1: 'التحليل العددي (1)',
            P3: 'برمجة (3)',
            P: 'احتمالات',
            LP: 'برمجة رياضية',
            L3: 'لغة أجنبية (3)',
            C3: 'تحليل (3)',
            EL: "الدارات الإلكترونية",
            AG1: 'خوارزميات (1)',
            L4: 'لغة أجنبية (4)',
            ST: 'الإحصاء',
            LO: 'نظم ودارات منطقية',
            NA2: 'التحليل العددي (2)',
            C4: 'تحليل (4)',
            MH: 'مهارات التواصل'
        };


        for (let i = 0; i < maxRows; i++) {
            const tr = document.createElement('tr');


            const td1 = document.createElement('td');
            if (i < sem1Keys.length) {
                const key = sem1Keys[i];
                const grade = student.semester1[key];
                td1.innerHTML = `${courseNames[key] || key}: <span class="${grade < 60 ? 'fail-grade' : 'not-fail-grade'}">${grade}</span>`;
            } else {
                td1.innerHTML = '&nbsp;';
            }


            const td2 = document.createElement('td');
            if (i < sem2Keys.length) {
                const key = sem2Keys[i];
                const grade = student.semester2[key];
                td2.innerHTML = `${courseNames[key] || key}: <span class="${grade < 60 ? 'fail-grade' : 'not-fail-grade'}">${grade}</span>`;
            } else {
                td2.innerHTML = '&nbsp;';
            }

            tr.appendChild(td1);
            tr.appendChild(td2);
            tableBody.appendChild(tr);
        }


        document.getElementById('semester1Avg').textContent = student.semester1.AVG1;
        document.getElementById('semester2Avg').textContent = student.semester2.AVG2;
    }
});
