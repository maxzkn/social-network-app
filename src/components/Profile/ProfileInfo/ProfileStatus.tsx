import React, {ChangeEvent, useEffect, useState} from "react";

// type PropsType = {
//     ...
// }
//
// type StateType = {
//     ...
// }

// class ProfileStatus extends React.Component<PropsType, StateType> {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         isEditMode: false
//     //     }
//     // }
//
//     // локальный стэйт синхронизируется с глобальным только единожды - когда (классовая компонента) обьект формируется!
//     state = {
//         isEditMode: false,
//         userStatus: this.props.userStatus
//     }
//
//     activateEditMode = () => {
//         this.setState({
//             isEditMode: true
//         });
//     }
//
//     deactivateEditMode = () => {
//         this.setState({
//             isEditMode: false
//         });
//         this.props.updateUserStatus(this.state.userStatus);
//     }
//
//     onStatusChange = (e) => {
//         this.setState({
//             userStatus: e.currentTarget.value
//         });
//     }
//
//     //Смотрите, когда мы обновляем страницу, происходит два телодвижения:  this.props.getUserProfile(userId) и this.props.getStatus(userId). Каждый из этих запросов ждет ответа от сервера.
//     // Если профиль приходить БЫСТРЕЕ чем статус, то рендер происходит с ОДНИМ НЮАНСОМ - так как сервер нам ещё не прислал ответ со статусом, то в ЛОКАЛЬНЫЙ стейт записывается ПУСТОЙ статус, потому что он у нас в глобальном стейте тоже пустой.
//     // Затем, когда уже от сервера приходит ответ со статусом, то происходит новый рендер, где мы видим статус на странице, так как он записался в глобальный стейт и соответственно есть в глобальных пропсах, НО статус в ЛОКАЛЬНОМ стейте НЕ МЕНЯЕТСЯ и остается ПУСТЫМ. В итоге при даблклике в инпуте будет пустота.
//     // Тут самое главное понять, что рендер происходит молниеносно. Мы не видим первый рендер с пустым статусом, а видим только итог второго, когда статус уже пришёл и отображается на странице, но не в импуте. Так как локальный стейт уже сформировался с пустым статусом в первом рендере, то во втором рендере статус туда уже не запишется и поэтому будет пустой инпут.
//     // Для этого нам и нужен componentDidUpdate, который всегда вызывается при каждом новом рендере. Когда у нас происходит второй рендер, мы сверяем старые пропсы в локальном стейте с новыми пропсами из глобального. Если они различаются, то с помощью setState изменяем пустой статус в пропсах локального стейта на новый статус, который пришел в новых пропсах.
//     componentDidUpdate(prevProps: PropsType, prevState: StateType) {
//         if (prevProps.userStatus !== this.props.userStatus) {
//             this.setState({
//                 userStatus: this.props.userStatus
//             })
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 {this.state.isEditMode ?
//                     <div>
//                         <input autoFocus={true}
//                                onBlur={this.deactivateEditMode}
//                                value={this.state.userStatus}
//                                onChange={this.onStatusChange}
//                         />
//                     </div> :
//                     <div>
//                        <span onDoubleClick={this.activateEditMode}>{this.props.userStatus || "Put your status here!"}</span>
//                     </div>
//                 }
//             </div>
//         );
//     }
// };

type ProfileStatusType = {
    userStatus: string
    updateUserStatus: (status: string) => void
    globalError: any
}

// ProfileStatus with hooks
const ProfileStatus = (props: ProfileStatusType) => {
    // const stateWithSetState = useState(false);
    // const isEditMode = stateWithSetState[0];
    // const setIsEditMode = stateWithSetState[1];
    // array desctructuring assignment:
    const [isEditMode, setIsEditMode] = useState(false);
    const [status, setStatus] = useState(props.userStatus);

    const activateEditMode = () => {
        setIsEditMode(true);
    }

    const deactivateEditMode = () => {
        setIsEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    // вместо ComponentDidMount (если пустой массив (зависимость) хотя так делать нехорошо), ComponentDidUpdate
    useEffect(() => {
        setStatus(props.userStatus);
    }, [props.userStatus]);

    return (
        <>
            <div>
                {isEditMode ?
                    <div>
                        <input autoFocus={true}
                               onBlur={deactivateEditMode}
                               value={status}
                               onChange={onStatusChange}
                        />
                    </div> :
                    <div>
                       <span onDoubleClick={activateEditMode}>{props.userStatus || "Put your status here!"}</span>
                    </div>
                }
            </div>
            {props.globalError && <div style={{color: "darkred", padding: "10px", border: "1px solid darkred", margin: "5px 0"}}>
                {props.globalError.toString()}
            </div>}
        </>
    );
};

// const ProfileStatus = (props) => {
//     const [isEditMode, setIsEditMode] = useState(false);
//
//     return (
//       <div>
//           <div>
//               <span>{props.status}</span>
//           </div>
//           <div>
//               <input value={props.status}/>
//           </div>
//       </div>
//   );
// };

export default ProfileStatus;
