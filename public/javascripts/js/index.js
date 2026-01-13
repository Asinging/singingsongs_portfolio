let vm = new Vue({
    el: '#app',
    data: {
        isDownloading: false,
        fullName: '',
        emailBody: '',
        subject: '',
        emailFrom: '',
        isSending: false,
        emailSent: false,
        isDownloadError: false,
        buttonIndex: 0,
        alerty: {}
    },
    watch: {
        emailSent: {
            immediate: true,
            handler(val) {
                if (val) {
                    setTimeout(() => {
                        this.emailSent = false;
                    }, 5000);
                }
            }
        },
        isDownloadError: {
            immediate: true,
            handler(val) {
                if (val) {
                    setTimeout(() => {
                        this.isDownloadError = false;
                        this.isDownloading = false;
                    }, 3000);
                }
            }
        }
    },

    methods: {
        submitForm(e) {
            e.preventDefault();
            if (this.emailBody === '' || this.subject === '' || this.emailFrom === '') {
                alert('Please fill the form completely');
                return false;
            }
            let query = new FormData();
            let dis = this;
            query.append('fullName', dis.fullName);
            query.append('emailBody', dis.emailBody);
            query.append('emailFrom', dis.emailFrom);
            query.append('subject', dis.subject);
            let obj = {
                fullName: dis.fullName,
                emailBody: dis.emailBody,
                emailFrom: dis.emailFrom,
                subject: dis.subject
            };
            this.isSending = true;
            this.emailSent = false;
            axios
                .post('/email/submit', obj)
                .then(response => {
                    this.isSending = false;
                    this.emailSent = true;
                    this.fullName = '';
                    this.emailBody = '';
                    this.emailFrom = '';
                    this.subject = '';
                    this.alerty.title = 'Email Successfully sent!';
                    this.alerty.body = 'We will bet back to you in less than no time';
                })
                .catch(error => {
                    this.isSending = false;
                    this.emailSent = true;
                    this.alerty.title = 'Ouch!!!';
                    this.alerty.body = 'There was an error while sending email >>>';
                });
        },
        downloadDoc(index) {
            this.buttonIndex = index;

            this.isDownloadError = false;
            this.isDownloading = true;

            axios
                .get(`/docs/downloadPdf`, {
                    //  .get(`/`, {
                    responseType: 'blob'
                })
                .then(response => {
                    this.isDownloading = false;
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    //   const url = window.URL.createObjectURL(response.data);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Singingsongs CV.pdf'); // or any other filename you want
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(err => {
                    debugger;
                    console.log(err);
                    this.isDownloadError = true;
                    this.alerty.title = 'Error downloading CV';
                    this.isDownloading = false;
                });
        }
    }
});