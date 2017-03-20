$.validator.addMethod("lettersonly", function(value, element){
    return this.optional(element) || /^[a-z]+$/i.test(value);
});
//check out https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.js for additional validation methods
$(function(){
	//form submit success/failure message	
	var feedback    = $('#feedback'),
		feedbackDiv = feedback.find('span');
		
	function showFeedback(message, attr) {
		feedbackDiv.text(message),
		feedbackDiv.attr('class', attr);
		feedbackDiv.delay(3000).fadeOut('slow');
	}
	
	//Visit https://jqueryvalidation.org/ for more examples of the validate execution
 $("#commentForm").validate({
      debug: true, //Form will not submit while set to true.
        rules: {
            firstname: {required: true, lettersonly: true},
			lastname: {required: true, lettersonly: true},
            email: {required: true, email:true},
            comment: {required: true, minlength: 10}
        },
        messages: {
            firstname: {
                required: ' First name is required',
                lettersonly: ' Name can only contain letters'
            },
			lastname: {
                required: ' Last name is required',
                lettersonly: ' Name can only contain letters'
            },
            email: {
                required: ' Please enter an email address',
                email: ' Please enter a <em>valid</em> email address'
            },
            comment: {
                required: ' A comment is required',
                minlength: ' Your comment must excede 10 characters'
            },
        },
		//places errors into divs with respective id
		errorPlacement: function(error, element){
			if (element.attr('name') == 'comment')
				error.insertAfter('#commentError');
			else if(element.attr('name') == 'email')
				error.insertAfter('#emailError');
			else if(element.attr('name') == 'lastname')
				error.insertAfter('#lnameError');
			else if(element.attr('name') == 'firstname')
				error.insertAfter('#fnameError');
			else
				error.insertAfter(element);
			},
		submitHandler: function(form) {
			var options = {
				beforeSubmit: function() {
					//Anything you want done before the form submits
				},
				success:function() {
					showFeedback('Thank you for your message, we will get back to you as soon as possible.','success');
					form.reset();
					tailbar.delay(1000).slideToggle('slow');
				},
				error:function(){
					showFeedback('Sorry there was an unexpected error and your message was not sent. Please try again later.','failure');
				}				
			};
			$(form).ajaxSubmit(options);
        },
		invalidHandler: function() {
			showFeedback('One or more of the fields are invalid.','failure');			
		}
 });    
    
});