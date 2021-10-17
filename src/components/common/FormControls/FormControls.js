import React from "react";
import styles from "./FormControls.module.css";

export const FormControl = Element => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <Element {...input} {...props} />
            { hasError &&
                <div>
                    <span>{meta.error}</span>
                </div>}
        </div>
    )
}

// export const FormControl = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//             {props.children}
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
