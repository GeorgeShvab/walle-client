import { useRegistrationMutation } from '../../api/authApiSlice'
import {
  FailedResponse,
  RegistrationArgs,
  ValidationError,
} from '../../../types'
import { useNavigate } from 'react-router-dom'
import { FormikHelpers } from 'formik'

const useRegistration = () => {
  const navigate = useNavigate()

  const [register, data] = useRegistrationMutation()

  return [
    async (
      args: RegistrationArgs,
      actions: FormikHelpers<RegistrationArgs>
    ) => {
      try {
        await register(args).unwrap()

        navigate('/registration/success')
      } catch (e: any) {
        if (e.status === 400) {
          actions.setErrors((e as FailedResponse<ValidationError>).data.errors)
        }
      }
    },
    data,
  ] as const
}

export default useRegistration
