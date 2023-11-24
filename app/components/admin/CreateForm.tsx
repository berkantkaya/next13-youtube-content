"use client"
import { FaComputer } from "react-icons/fa6";
import { GiBallerinaShoes } from "react-icons/gi";
import { FaTabletAlt } from "react-icons/fa";
import { CiMicrophoneOn } from "react-icons/ci";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";




import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../general/Heading"
import Input from "../general/Input"
import Checkbox from "../general/Checkbox"
import ChoiceInput from "../general/ChoiceInput";
import Button from "../general/Button";
import { useState } from "react";
import firebaseApp from "@/libs/firebase";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateForm = () => {
   const [img, setImg] = useState<File | null>(null)
   const router = useRouter();

   const categoryList = [
      {
         name: "Bilgisayar",
         icon: FaComputer
      },
      {
         name: "Ayakkabı",
         icon: GiBallerinaShoes
      },
      {
         name: "Tablet",
         icon: FaTabletAlt
      },
      {
         name: "Mikrofon",
         icon: CiMicrophoneOn
      },
      {
         name: "Ayakkabı1",
         icon: FaComputer
      },
      {
         name: "Ayakkabı2",
         icon: FaComputer
      },
   ]


   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: "",
         description: "",
         brand: "",
         category: "",
         price: "",
         image: "",
         inStock: false
      }
   })

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      console.log("data", data)

      let uploadedImg;

      const handleChange = async () => {
         toast.success('Yükleme işlemi basarılı !!!')
         try {
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, 'images/shop.jpg');
   

            const uploadTask = uploadBytesResumable(storageRef, img);
            await new Promise<void>((resolve, reject) => {
               uploadTask.on('state_changed',
                  (snapshot) => {
                     // Observe state change events such as progress, pause, and resume
                     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                     console.log('Upload is ' + progress + '% done');
                     switch (snapshot.state) {
                        case 'paused':
                           console.log('Upload is paused');
                           break;
                        case 'running':
                           console.log('Upload is running');
                           break;
                     }
                  },
                  (error) => {
                     reject(error)
                  },
                  () => {
                     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        uploadedImg =downloadURL;
                        resolve()
                     }).catch((error) => {
                        console.log(error)
                     });
                  }
               );
            })


         } catch (error) {
            console.log(error)
         }
      }
      await handleChange()

      let newData = {...data, image: uploadedImg} 

      axios.post('/api/product', newData)
      .then(() => {
         toast.success('Ürün ekleme işlemi basarılı !!!')
         router.refresh();

      }).catch((error) => {
        console.log(error, "error")
      })

      console.log(newData, "NEWDATAAAA")
   }

   const category = watch('category')

   const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
         shouldDirty: true,
         shouldTouch: true,
         shouldValidate: true
      })
   }

   const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setImg(e.target.files[0])
      }
   }


   return (
      <div>
         <Heading text="ÜRÜN OLUSTUR" center />
         <Input
            placeholder="Ad"
            type="text"
            id="name"
            register={register}
            errors={errors}
            required
         />
         <Input
            placeholder="Acıklama"
            type="text"
            id="description"
            register={register}
            errors={errors}
            required
         />
         <Input
            placeholder="Marka"
            type="text"
            id="brand"
            register={register}
            errors={errors}
            required
         />
         <Input
            placeholder="Fiyat"
            type="number"
            id="price"
            register={register}
            errors={errors}
            required
         />
         <Checkbox
            id="inStock"
            label="Ürün Stokta Mevcut mu ?"
            register={register}
         />
         <div className="flex flex-wrap gap-3">
            {
               categoryList.map((cat, i) => (
                  <ChoiceInput
                     key={i}
                     icon={cat.icon}
                     text={cat.name}
                     onClick={(category) => setCustomValue("category", category)}
                     selected={category == cat.name}
                  />
               ))
            }
         </div>
         <input className="mb-2" type="file" onChange={onChangeFunc} />
         <Button text="Ürün Olustur" onClick={handleSubmit(onSubmit)} />

      </div>
   )
}

export default CreateForm