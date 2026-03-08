async function submitForm(event) {
    event.preventDefault();

    // 🔹 Get image files properly
    const cnicFile = document.getElementById('cnic_copy').files[0];
    const degreeFile = document.getElementById('Priveious_deg').files[0];
    const alumaFile = document.getElementById('Alumaislamiya_copy').files[0];

    if (!cnicFile || !degreeFile || !alumaFile) {
        alert("Please upload all images");
        return;
    }

    // 🔹 Upload function
    async function uploadFile(file, folderName) {
        const fileName = `${folderName}-${Date.now()}-${file.name}`;

        const { data, error } = await supabase.storage
    .from('documents')
    .upload(fileName, file);

        if (error) throw error;

        const { publicUrl } = supabase.storage
            .from('documents')
            .getPublicUrl(fileName);

        return publicUrl;
    }

    try {
        // 🔹 Upload all images first
        const cnicUrl = await uploadFile(cnicFile, "cnic_copy");
        const degreeUrl = await uploadFile(degreeFile, "Priveious_deg");
        const alumaUrl = await uploadFile(alumaFile, "Alumaislamiya_copy");

        // 🔹 Now create data object with URLs
        const data_object = {
            student_name: document.getElementById('studentName').value,
            gender: document.getElementById('gender').value,
            father_name: document.getElementById('fatherName').value,
            dob: document.getElementById('dob').value,
            cnic: document.getElementById('cnic').value,
            address: document.getElementById('addressField').value,
            contact_number: document.getElementById('contact').value,
            email: document.getElementById('email').value,
            previous_qualification: document.getElementById('prevQual').value,
            islamic_qualification: document.getElementById('Islqual').value,
            mark: document.getElementById('marks').value,
            course: document.getElementById('course').value,
            religion: document.getElementById('religion').value,
            sign: document.getElementById('signature').value,
            cnic_copy: cnicUrl,
            previous_degree: degreeUrl,
            alumaislamiya_copy: alumaUrl
        };

        // 🔹 Insert into database
        const { error } = await supabase
            .from('admission')
            .insert([data_object]);

        if (error) throw error;

        alert("Form submitted successfully ✅");
        document.getElementById('admissionForm').reset();

    } catch (error) {
        alert("Error: " + error.message);
        console.error(error);
    }
}