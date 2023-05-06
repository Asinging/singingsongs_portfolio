let vm = new Vue({
   el: '#app',
   data: {
      isDownloading: false,
      fullName: '',
      emailBody: '',
      subject: '',
      emailFrom: '',
      isSending: false,
      emailSent: false
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
               console.log(response.data);
            })
            .catch(error => {
               this.isSending = false;
               console.error(error);
            });
      },
      downloadDoc() {
         this.isDownloading = true;

         axios
            // .get(`/docs/downloadPdf`, {
            .get(`/`, {
               responseType: 'blob'
            })
            .then(response => {
               this.isDownloading = false;
               const blob = new Blob([ response.data ], { type: 'application/pdf' });
               const link = document.createElement('a');
               link.href = URL.createObjectURL(blob);
               link.download = 'Singingsongs CV';
               link.click();
               URL.revokeObjectURL(link.href);
            })
            .catch(() => {
               this.isDownloading = false;
               console.error;
            });
      }
   }
});
