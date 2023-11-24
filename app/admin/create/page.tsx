import { getCurrentUser } from "@/app/actions/getCurrentUser"
import WarningText from "@/app/components/WarningText"
import CreateForm from "@/app/components/admin/CreateForm"
import AuthContainer from "@/app/components/containers/AuthContainer"

const CreateProduct = async() => {
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role !== "ADMIN"){
    return (
      <WarningText text="Buraya Girişin Yasaklı !!!"/>
    )
  }
  return (
    <AuthContainer>
       <CreateForm/>
    </AuthContainer>
  )
}

export default CreateProduct