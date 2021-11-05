import React from "react";
import styles from "./FormControls.module.css";
import {Field} from "redux-form";

export const FormControl = Element => ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <Element {...input} {...props} />
            { hasError &&
                <div>
                    <span>{error}</span>
                </div>}
        </div>
    )
}

export const createField = (placeholder, name, component, validators, props = {}, text = "") => (
  <div>
      <Field placeholder={placeholder}
       name={name}
       component={component}
       validate={validators}
       {...props}
      /> {text}
  </div>
)

// export const FormControl = ({input, meta, children}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//             {children}
//             { hasError &&
//                 <div>
//                     <span>{meta.error}</span>
//                 </div>}
//         </div>
//     )
// }
//
// export const Textarea = ({input, ...props}) => {
//     return <FormControl {...props}><textarea {...input} {...props} /></FormControl>
// }
//
// export const Input = ({input, ...props}) => {
//     return <FormControl {...props}><input {...input} {...props} /></FormControl>
// }

// export const Textarea = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//             <textarea {...input} {...props} />
//             { hasError &&
//                 <div>
//                     <span>{meta.error}</span>
//                 </div>}
//         </div>
//     )
// }
//
// export const Input = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//             <input {...input} {...props} />
//             { hasError &&
//                 <div>
//                     <span>{meta.error}</span>
//                 </div>}
//         </div>
//     )
// }
