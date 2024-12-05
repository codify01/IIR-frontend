import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { MdUploadFile } from "react-icons/md";
import img13 from "../../assets/image/img13.jfif"

const AutoDeposit: React.FC = () => {

  // const [isOpen, setIsOpened] = useState<boolean>(true)
  
  const formik = useFormik({
    initialValues: {
      amount: "",
      accountNumber: "",
      accountName: "",
      bankName: "",
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("Amount is required"),
      accountNumber: Yup.string().required("Account Number is required"),
      accountName: Yup.string().required("Account Name is required"),
      bankName: Yup.string().required("Bank Name is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);
      setSubmitting(true);
      setTimeout(() => {
        resetForm();
        setSubmitting(false);
      }, 5000);
    },
  });


  return (

    <div>
      <div className="absolute bottom-5 right-5 whitespace-nowrap px-5 pb-3 flex items-center gap-3 rounded-lg font-semibold">
        <small>Powered by: </small>
        <span className="rounded-full overflow-hidden w-[100px] h-5 inline-flex">
            <img src={img13} alt="" className="w-full h-full object-cover" />
        </span>
      </div>
      <form className="grid items-start md:grid-cols-2 grid-cols-1 md:gap-x-10 gap-y-5 my-5" onSubmit={formik.handleSubmit}>
        <div className="md:col-span-1 col-span-2 grid gap-3 relative">
            <label htmlFor="amountDeposited">Amount</label>
            <input 
                type="number" 
                name="amountDeposited" 
                id="amountDeposited"
                placeholder="Enter amount to deposit" 
                className="bg-pry/10 outline-0 border-0 w-full rounded-md h-[50px] indent-3"
            />
            <small className="hidden">Make sure the initiated transaction amount matches.</small>
        </div>
        <div className="col-span-2 text-center mt-5">
          <button 
              type="submit" 
              disabled={formik.isSubmitting}
              className="bg-pry rounded-lg text-sec font-semibold h-[55px] md:w-1/4 w-3/4"
          >
              Proceed to pay
          </button>
        </div>
      </form>
    </div>
  );

};

export default AutoDeposit;
