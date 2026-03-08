const form = document.getElementById('admission_form');

form.addEventListener('submit', submitForm);

async function submitForm(event) {
    event.preventDefault();

    const data_object = {
        student_name: document.getElementById('student_name').value,
        gender: document.getElementById('gender').value,
        father_name: document.getElementById('father_name').value,
        dob: document.getElementById('dob').value,
        cnic: null,
        address: '',
        contact_number: null,
        email: '',
        previous_qualification: '',
        mark: null,
        course: '',
        religion: '',
        sign: ''
    };

    const { data, error } = await supabase
        .from('admission')  // <-- Uppercase A!
        .insert([data_object]);

    if (error) {
        console.error(error);
        alert('Error: ' + error.message);
    } else {
        alert('Form submitted successfully!');
        form.reset();
    }
}