import { FC } from 'react'
import { DocumentType } from '../../../types'
import useTheme from '@mui/material/styles/useTheme'
import { SxProps } from '@mui/material/styles'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

const TabIcon: FC<{ type: DocumentType; sx?: SxProps }> = ({ type, sx }) => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  switch (type) {
    case 'txt':
      return isLesserThanMd ? (
        <Box sx={sx} display="flex" justifyContent="center" alignItems="center">
          <svg
            width="18"
            height="24"
            viewBox="0 0 18 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_97_1484)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 6.75V16.5H16.5V6.75H13.5C12.9033 6.75 12.331 6.51295 11.909 6.09099C11.4871 5.66903 11.25 5.09674 11.25 4.5V1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V16.5H0V3C0 2.20435 0.31607 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0L11.25 0L18 6.75Z"
                fill={palette.primary.main}
              />
              <path
                d="M2.70703 17.5928H6.64453V18.6958H2.70703V17.5928ZM4.1001 18.1245H5.24707V23.9824H4.1001V18.1245Z"
                fill={palette.primary.main}
              />
              <path
                d="M8.69238 20.1724L9.80859 17.5928H11.0391L9.2505 21.1919L8.0025 23.9824H6.77637L8.69238 20.1724ZM8.71435 21.4116L8.54736 21.0645L6.82909 17.5928H8.05518L9.12304 19.9658L9.3252 20.4053L11.1357 23.9824H9.90528L8.71435 21.4116Z"
                fill={palette.primary.main}
              />
              <path
                d="M11.3555 17.5928H15.293V18.6958H11.3555V17.5928ZM12.7485 18.1245H13.8955V23.9824H12.7485L12.7485 18.1245Z"
                fill={palette.primary.main}
              />
            </g>
            <defs>
              <clipPath id="clip0_97_1484">
                <rect width="18" height="23.9824" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      ) : (
        <Box sx={sx} display="flex" justifyContent="center" alignItems="center">
          <svg
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_97_1484)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4.5V11H11V4.5H9C8.60218 4.5 8.22064 4.34196 7.93934 4.06066C7.65804 3.77936 7.5 3.39782 7.5 3V1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V11H0V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L7.5 0L12 4.5Z"
                fill={palette.primary.main}
              />
              <path
                d="M1.80469 11.7285H4.42969V12.4639H1.80469V11.7285ZM2.7334 12.083H3.49805V15.9883H2.7334V12.083Z"
                fill={palette.primary.main}
              />
              <path
                d="M5.79492 13.4482L6.53906 11.7285H7.35938L6.167 14.1279L5.335 15.9883H4.51758L5.79492 13.4482ZM5.80957 14.2744L5.69824 14.043L4.55273 11.7285H5.37012L6.08203 13.3105L6.2168 13.6035L7.4238 15.9883H6.60352L5.80957 14.2744Z"
                fill={palette.primary.main}
              />
              <path
                d="M7.57031 11.7285H10.1953V12.4639H7.57031V11.7285ZM8.49902 12.083H9.26367V15.9883H8.499L8.49902 12.083Z"
                fill={palette.primary.main}
              />
            </g>
            <defs>
              <clipPath id="clip0_97_1484">
                <rect width="12" height="15.9883" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      )

    case 'json':
      return isLesserThanMd ? (
        <Box sx={sx} display="flex" justifyContent="center" alignItems="center">
          <svg
            width="18"
            height="24"
            viewBox="0 0 18 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_97_1478)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.9999 6.6831V16.3365H16.5148V6.6831H13.5445C12.9537 6.6831 12.3871 6.4484 11.9693 6.03062C11.5516 5.61285 11.3168 5.04623 11.3168 4.4554V1.48513H3.14861C2.75473 1.48513 2.37698 1.6416 2.09846 1.92012C1.81995 2.19864 1.66348 2.57639 1.66348 2.97027V16.3365H0.178345V2.97027C0.178345 2.1825 0.491283 1.427 1.04832 0.869971C1.60535 0.312938 2.36085 0 3.14861 0L11.3168 0L17.9999 6.6831Z"
                fill={palette.primary.main}
              />
              <path
                d="M0.6309 23.6113C0.372529 23.4878 0.153958 23.2944 0 23.0529L0.844091 22.3263C0.924799 22.4374 1.02969 22.5286 1.15084 22.5932C1.26342 22.6552 1.38993 22.6877 1.51849 22.6874C1.60036 22.6924 1.68229 22.6787 1.75805 22.6473C1.83382 22.6158 1.90144 22.5676 1.95577 22.5062C2.06733 22.3603 2.12221 22.1789 2.11023 21.9956V17.4185H3.26324V22.0653C3.27256 22.3919 3.20238 22.7159 3.05874 23.0095C2.92773 23.2652 2.72008 23.4736 2.46483 23.6055C2.1736 23.749 1.85173 23.8192 1.52719 23.81C1.21697 23.8151 0.909916 23.747 0.6309 23.6113Z"
                fill={palette.primary.main}
              />
              <path
                d="M5.15157 23.6519C4.89251 23.5533 4.66271 23.3907 4.48371 23.1791C4.29969 22.9526 4.17217 22.6857 4.11169 22.4002L5.16898 21.9347C5.23238 22.1603 5.3638 22.3608 5.54534 22.509C5.72252 22.642 5.93955 22.711 6.161 22.7048C6.36846 22.7173 6.57403 22.659 6.74403 22.5395C6.81292 22.4847 6.86779 22.4143 6.9041 22.3341C6.94041 22.2539 6.95713 22.1662 6.95287 22.0783V21.7998C6.95766 21.6712 6.91422 21.5456 6.83109 21.4474C6.74348 21.3506 6.63482 21.2751 6.51347 21.2269C6.38294 21.1747 6.21181 21.1152 6.00006 21.0514C5.99283 21.0465 5.9847 21.043 5.97613 21.0413L5.96089 21.034L5.90434 21.021C5.61373 20.9376 5.33064 20.8299 5.05807 20.699C4.8304 20.5805 4.63766 20.4045 4.49897 20.1885C4.33269 19.9095 4.25248 19.5876 4.26838 19.2633V19.0892C4.2594 18.7626 4.33828 18.4395 4.49679 18.1538C4.65083 17.8911 4.8827 17.6828 5.16032 17.5577C5.49344 17.4127 5.85444 17.3428 6.21761 17.3532C6.50102 17.3481 6.78265 17.3989 7.04647 17.5026C7.28092 17.6004 7.48675 17.7561 7.64472 17.9551C7.81448 18.1786 7.93732 18.4341 8.00586 18.7063L7.00078 19.1762C6.93574 18.968 6.81722 18.7805 6.65705 18.6324C6.51774 18.5097 6.33793 18.4431 6.15234 18.4452C5.95337 18.4328 5.7559 18.4868 5.59107 18.599C5.52714 18.6493 5.47606 18.714 5.44202 18.7879C5.40799 18.8618 5.39197 18.9427 5.39528 19.0239V19.2371C5.38878 19.3758 5.43547 19.5117 5.52581 19.6171C5.61532 19.7166 5.7251 19.7957 5.84777 19.8492C5.9754 19.9043 6.15234 19.9695 6.37859 20.0421C6.39804 20.045 6.41705 20.0503 6.43516 20.058C6.45256 20.0653 6.46997 20.0711 6.48737 20.0769C6.50135 20.0794 6.51515 20.0828 6.52871 20.087C6.54034 20.0928 6.55282 20.0967 6.56568 20.0986C6.83709 20.1789 7.1001 20.2853 7.35104 20.4162C7.56578 20.5359 7.7457 20.7093 7.87315 20.9195C8.02601 21.1884 8.0992 21.4952 8.08417 21.8042V22.074C8.09319 22.4014 8.01191 22.7251 7.84923 23.0094C7.68863 23.274 7.44995 23.4822 7.16607 23.6055C6.82808 23.7496 6.46304 23.8194 6.09573 23.81C5.77395 23.816 5.45383 23.7624 5.15157 23.6519Z"
                fill={palette.primary.main}
              />
              <path
                d="M9.69836 23.5795C9.40868 23.4323 9.17047 23.2007 9.0152 22.9152C8.85 22.6044 8.76758 22.2563 8.77588 21.9043V19.2589C8.76725 18.906 8.84967 18.5569 9.0152 18.2451C9.17144 17.9611 9.40947 17.7307 9.69836 17.5837C10.024 17.4319 10.3789 17.3531 10.7382 17.3531C11.0976 17.3531 11.4525 17.4319 11.7781 17.5837C12.067 17.7307 12.305 17.9611 12.4613 18.2451C12.6268 18.5569 12.7092 18.906 12.7006 19.2589V21.9042C12.7089 22.2562 12.6265 22.6043 12.4613 22.9151C12.306 23.2006 12.0678 23.4322 11.7781 23.5794C11.4525 23.7313 11.0976 23.81 10.7382 23.81C10.3789 23.81 10.024 23.7314 9.69836 23.5795ZM11.1646 22.5744C11.2847 22.5095 11.3819 22.4092 11.4431 22.2872C11.5099 22.149 11.5427 21.9969 11.5388 21.8434V19.3154C11.5424 19.1634 11.5096 19.0128 11.4432 18.876C11.3816 18.7539 11.2845 18.6533 11.1647 18.5874C11.0339 18.5168 10.8869 18.4813 10.7383 18.4845C10.5903 18.4811 10.4441 18.5166 10.3141 18.5874C10.1949 18.6541 10.098 18.7545 10.0356 18.876C9.96769 19.0124 9.93408 19.1632 9.93772 19.3155V21.8433C9.93377 21.997 9.96738 22.1494 10.0356 22.2872C10.0977 22.4086 10.1946 22.5086 10.3141 22.5743C10.4446 22.6435 10.5906 22.6779 10.7383 22.6744C10.8866 22.6778 11.0333 22.6434 11.1646 22.5744Z"
                fill={palette.primary.main}
              />
              <path
                d="M13.636 17.4185H14.7847L16.7078 21.9478L16.5947 22.0914V17.4185H17.6549V23.7404H16.4946L14.5888 19.3677L14.6933 19.2241V23.7404H13.636V17.4185Z"
                fill={palette.primary.main}
              />
            </g>
            <defs>
              <clipPath id="clip0_97_1478">
                <rect width="18" height="23.81" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      ) : (
        <Box sx={sx} display="flex" justifyContent="center" alignItems="center">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_97_1478)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.1201 4.5V11H11.1201V4.5H9.12012C8.72229 4.5 8.34076 4.34196 8.05946 4.06066C7.77815 3.77936 7.62012 3.39782 7.62012 3V1H2.12012C1.8549 1 1.60055 1.10536 1.41301 1.29289C1.22547 1.48043 1.12012 1.73478 1.12012 2V11H0.120117V2C0.120117 1.46957 0.330831 0.960859 0.705904 0.585786C1.08098 0.210714 1.58968 0 2.12012 0L7.62012 0L12.1201 4.5Z"
                fill={palette.primary.main}
              />
              <path
                d="M0.42481 15.8984C0.250839 15.8153 0.103666 15.685 0 15.5224L0.56836 15.0332C0.622704 15.1079 0.693333 15.1694 0.77491 15.2129C0.850712 15.2547 0.935896 15.2765 1.02246 15.2763C1.07759 15.2797 1.13275 15.2704 1.18377 15.2493C1.23478 15.2281 1.28031 15.1956 1.3169 15.1543C1.39202 15.056 1.42897 14.9339 1.4209 14.8105V11.7285H2.19727V14.8574C2.20354 15.0774 2.15629 15.2955 2.05957 15.4932C1.97136 15.6654 1.83154 15.8057 1.65967 15.8945C1.46357 15.9912 1.24684 16.0384 1.02832 16.0322C0.819435 16.0356 0.612683 15.9898 0.42481 15.8984Z"
                fill={palette.primary.main}
              />
              <path
                d="M3.46874 15.9258C3.29431 15.8595 3.13957 15.7499 3.01904 15.6074C2.89514 15.455 2.80928 15.2752 2.76855 15.083L3.48046 14.7695C3.52316 14.9214 3.61165 15.0565 3.73388 15.1563C3.85319 15.2458 3.99932 15.2923 4.14843 15.2881C4.28813 15.2965 4.42654 15.2573 4.54101 15.1768C4.5874 15.1399 4.62434 15.0925 4.64879 15.0385C4.67324 14.9845 4.6845 14.9254 4.68163 14.8662V14.6787C4.68486 14.5922 4.65561 14.5075 4.59963 14.4414C4.54064 14.3762 4.46748 14.3254 4.38576 14.293C4.29787 14.2578 4.18264 14.2178 4.04006 14.1748C4.0352 14.1715 4.02973 14.1692 4.02395 14.168L4.01369 14.1631L3.97562 14.1543C3.77993 14.0981 3.58932 14.0256 3.40578 13.9375C3.25249 13.8577 3.12271 13.7392 3.02933 13.5938C2.91736 13.4059 2.86335 13.1892 2.87405 12.9708V12.8536C2.86801 12.6336 2.92112 12.4161 3.02785 12.2237C3.13158 12.0468 3.2877 11.9066 3.47463 11.8223C3.69894 11.7247 3.94201 11.6777 4.18655 11.6846C4.37738 11.6812 4.56702 11.7154 4.74465 11.7852C4.90252 11.8511 5.04111 11.9559 5.14748 12.0899C5.26179 12.2404 5.3445 12.4125 5.39066 12.5958L4.71389 12.9122C4.6701 12.772 4.5903 12.6457 4.48244 12.546C4.38864 12.4634 4.26757 12.4185 4.1426 12.42C4.00863 12.4116 3.87567 12.448 3.76467 12.5235C3.72163 12.5573 3.68724 12.6009 3.66432 12.6507C3.6414 12.7004 3.63061 12.7549 3.63284 12.8096V12.9532C3.62847 13.0465 3.6599 13.1381 3.72073 13.209C3.781 13.276 3.85493 13.3293 3.93752 13.3653C4.02346 13.4024 4.1426 13.4463 4.29494 13.4952C4.30805 13.4971 4.32084 13.5007 4.33303 13.5059C4.34475 13.5108 4.35647 13.5147 4.36819 13.5186C4.3776 13.5203 4.3869 13.5226 4.39602 13.5254C4.40386 13.5293 4.41226 13.532 4.42092 13.5332C4.60368 13.5873 4.78077 13.6589 4.94973 13.7471C5.09433 13.8277 5.21548 13.9445 5.30129 14.086C5.40422 14.267 5.4535 14.4737 5.44338 14.6817V14.8633C5.44946 15.0838 5.39472 15.3017 5.28518 15.4932C5.17705 15.6713 5.01634 15.8116 4.82518 15.8946C4.5976 15.9916 4.35181 16.0386 4.10449 16.0323C3.88782 16.0363 3.67227 16.0002 3.46874 15.9258Z"
                fill={palette.primary.main}
              />
              <path
                d="M6.53025 15.877C6.33519 15.7779 6.1748 15.6219 6.07025 15.4297C5.95901 15.2204 5.90352 14.986 5.90911 14.7491V12.9678C5.90329 12.7302 5.95879 12.4951 6.07025 12.2852C6.17545 12.0939 6.33572 11.9388 6.53025 11.8398C6.7495 11.7376 6.9885 11.6846 7.23044 11.6846C7.47238 11.6846 7.71138 11.7376 7.93064 11.8398C8.12516 11.9388 8.28543 12.0939 8.39064 12.2852C8.50209 12.4951 8.55758 12.7302 8.55177 12.9678V14.749C8.55735 14.986 8.50186 15.2204 8.39064 15.4297C8.28608 15.6219 8.12569 15.7778 7.93064 15.8769C7.71138 15.9792 7.47238 16.0322 7.23044 16.0322C6.9885 16.0322 6.7495 15.9793 6.53025 15.877ZM7.51755 15.2002C7.59839 15.1565 7.66385 15.089 7.70505 15.0069C7.75004 14.9138 7.77213 14.8114 7.7695 14.7081V13.0059C7.77194 12.9035 7.74985 12.8021 7.70509 12.71C7.66365 12.6278 7.59828 12.56 7.51759 12.5157C7.42949 12.4681 7.33057 12.4442 7.23048 12.4463C7.13084 12.4441 7.03236 12.468 6.94484 12.5157C6.86457 12.5606 6.79935 12.6282 6.75734 12.71C6.71159 12.8018 6.68896 12.9034 6.69142 13.0059V14.708C6.68876 14.8115 6.71138 14.9141 6.75734 15.0068C6.79911 15.0886 6.86442 15.1559 6.94484 15.2002C7.0327 15.2468 7.13106 15.27 7.23048 15.2676C7.33033 15.2698 7.42912 15.2467 7.51755 15.2002Z"
                fill={palette.primary.main}
              />
              <path
                d="M9.18164 11.7285H9.95512L11.25 14.7783L11.1739 14.875V11.7285H11.8877V15.9853H11.1065L9.82324 13.041L9.89356 12.9443V15.9853H9.18164V11.7285Z"
                fill={palette.primary.main}
              />
            </g>
            <defs>
              <clipPath id="clip0_97_1478">
                <rect width="12.1201" height="16.0322" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      )
    case 'xml':
      return isLesserThanMd ? (
        <Box sx={sx} display="flex" justifyContent="center" alignItems="center">
          <svg
            width="18"
            height="24"
            viewBox="0 0 18 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_97_1489)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 6.75V16.5H16.5V6.75H13.5C12.9033 6.75 12.331 6.51295 11.909 6.09099C11.4871 5.66903 11.25 5.09674 11.25 4.5V1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V16.5H0V3C0 2.20435 0.31607 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0L11.25 0L18 6.75Z"
                fill={palette.primary.main}
              />
              <path
                d="M3.57276 20.1724L4.689 17.5928H5.91947L4.13087 21.1919L2.88287 23.9824H1.65674L3.57276 20.1724ZM3.59472 21.4116L3.42774 21.0645L1.70948 17.5928H2.9355L4.00338 19.9658L4.20552 20.4053L6.01602 23.9824H4.78565L3.59472 21.4116Z"
                fill={palette.primary.main}
              />
              <path
                d="M10.2349 17.5928H11.5356V23.9824H10.503V19.2715L10.5601 19.5527L9.48348 23.0596H8.68359L7.60693 19.6406L7.67284 19.2715V23.9824H6.63135V17.5928H7.941L9.08356 21.4775L10.2349 17.5928Z"
                fill={palette.primary.main}
              />
              <path
                d="M12.6343 17.5928H13.7769V23.9824H12.6343V17.5928ZM13.1221 22.8794H16.1455V23.9824H13.122L13.1221 22.8794Z"
                fill={palette.primary.main}
              />
            </g>
            <defs>
              <clipPath id="clip0_97_1489">
                <rect width="18" height="23.9824" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      ) : (
        <Box sx={sx} display="flex" justifyContent="center" alignItems="center">
          <svg
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_97_1489)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4.5V11H11V4.5H9C8.60218 4.5 8.22064 4.34196 7.93934 4.06066C7.65804 3.77936 7.5 3.39782 7.5 3V1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V11H0V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L7.5 0L12 4.5Z"
                fill={palette.primary.main}
              />
              <path
                d="M2.38184 13.4482L3.126 11.7285H3.94631L2.75391 14.1279L1.92191 15.9883H1.10449L2.38184 13.4482ZM2.39648 14.2744L2.28516 14.043L1.13965 11.7285H1.957L2.66892 13.3105L2.80368 13.6035L4.01068 15.9883H3.19043L2.39648 14.2744Z"
                fill={palette.primary.main}
              />
              <path
                d="M6.82324 11.7285H7.69043V15.9883H7.002V12.8477L7.04009 13.0352L6.32232 15.373H5.78906L5.07129 13.0937L5.11523 12.8477V15.9883H4.4209V11.7285H5.294L6.05571 14.3184L6.82324 11.7285Z"
                fill={palette.primary.main}
              />
              <path
                d="M8.42285 11.7285H9.18457V15.9883H8.42285V11.7285ZM8.74805 15.2529H10.7637V15.9883H8.748L8.74805 15.2529Z"
                fill={palette.primary.main}
              />
            </g>
            <defs>
              <clipPath id="clip0_97_1489">
                <rect width="12" height="15.9883" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      )
    default:
      return null
  }
}

export default TabIcon
