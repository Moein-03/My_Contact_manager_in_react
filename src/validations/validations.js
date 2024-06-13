import * as yup from 'yup';

const contactSchema = yup.object().shape({
    fullname: yup.string().required('نام و نام خوانوادگی الزامی می باشد'),
    photo: yup.string().url('آدرس تصویر مخاطب معتبر نیست').required('لطفا تصویر مخاطب را وارد کنید'),
    mobile: yup.number().required('شماره کاربر الزامی می باشد'),
    email: yup.string().email('آدرس ایمیل معتبر نیست').required('آدرس ایمیل الزامی می باشد'),
    job: yup.string().nullable(),
    group: yup.string().required('انتخاب گروه الزامی می باشد')
});

export default contactSchema