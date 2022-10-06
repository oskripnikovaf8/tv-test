import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import classNames from 'classnames';
import './form.scss';

const SUBMIT_TEXT_SEND = 'Отправить';
const SUBMIT_TEXT_ERROR = 'Произошла ошибка';
const SUBMIT_TEXT_SUCCESS = 'Успешно';
const FORM_ERROR_MESSAGE = 'Не заполнены поля';
const FIELD_ERROR_MESSAGE = 'Поле не заполнено';

const VIDEO_COMMENT_SENT_API_ENDPOINT = 'https://corsanywhere.herokuapp.com/http://fe-dev-offer.herokuapp.com/comments/post/';

export const VideoForm = ({ id }: IVideoForm): JSX.Element => {
    const { register, formState: { errors, isDirty }, handleSubmit, reset } = useForm({ mode: 'onChange' });

    const [submitState, setSubmitState] = useState({
        submitClassName: 'btn--ok',
        submitText: SUBMIT_TEXT_SEND,
        submitErrorText: FORM_ERROR_MESSAGE,
        isFormValid: true,
        isFormSent: false,
    });

    const { submitClassName, submitText, submitErrorText, isFormValid, isFormSent } = submitState;

    const onSubmit = (data: IData): void => {
        axios({
            method: 'post',
            url: VIDEO_COMMENT_SENT_API_ENDPOINT + id,
            data,
        })
            .then(() => {
                reset({ author: '', comment: '', city: '' });
                setSubmitState({
                    ...submitState,
                    submitClassName: 'btn--success',
                    submitText: SUBMIT_TEXT_SUCCESS,
                    isFormValid: true,
                    isFormSent: true,
                });
            })
            .catch((error: string) => {
                setSubmitState({
                    ...submitState,
                    submitClassName: 'btn--error',
                    submitText: SUBMIT_TEXT_ERROR,
                });
                console.dir(error);
            });
    }

    useEffect(() => {
        if (errors.city?.type === 'required' || errors.author?.type === 'required') {
            setSubmitState({
                ...submitState,
                submitClassName: 'btn--error',
                submitText: SUBMIT_TEXT_ERROR,
                isFormValid: false,
            })
        } else {
            setSubmitState({
                ...submitState,
                submitClassName: '',
                submitText: SUBMIT_TEXT_SEND,
                isFormValid: true,
            })
        }
    }, [errors.city, errors.author]);

    useEffect(() => {
        if (isFormSent && isFormValid) {
            setSubmitState({
                ...submitState,
                submitClassName: '',
                submitText: SUBMIT_TEXT_SEND,
                isFormSent: false,
            });
        }
    }, [isDirty]);

    return (
        <>
            <h2 className="form__title">Оставьте комментарий</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <fieldset>
                    <legend>Что вы думаете об этом видео?</legend>
                    <div className="form__card">

                        <div className={classNames('form__field', { 'is-field-error': errors.author?.type === 'required' })}>
                            <label htmlFor="author">Фамилия и имя<span className="form__asterix">*</span></label>
                            <input id="author" {...register("author", { required: true })} aria-invalid={errors.author ? "true" : "false"} />
                            {errors.author?.type === 'required' && <div role="alert" className="form__alert">{FIELD_ERROR_MESSAGE}</div>}
                        </div>

                        <div className={classNames('form__field', { 'is-field-error': errors.city?.type === 'required' })}>
                            <label htmlFor="city">Город<span className="form__asterix">*</span></label>
                            <input id="city" {...register("city", { required: true })} aria-invalid={errors.city ? "true" : "false"} />
                            {errors.city?.type === 'required' && <div role="alert" className="form__alert">{FIELD_ERROR_MESSAGE}</div>}
                        </div>

                        <div className="form__field">
                            <label htmlFor="comment">Ваше мнение</label>
                            <textarea id="comment" {...register("comment", { required: false })}></textarea>
                        </div>

                        <input type="submit" value={submitText} className={submitClassName} />
                        {!isFormValid && <div role="alert" className="form__alert">{submitErrorText}</div>}
                    </div>
                </fieldset>
            </form>
        </>
    )
}
export interface IVideoForm {
    id: string;
}

export interface ISubmit {
    submitClassName: string,
    submitText: string,
    submitErrorText?: string,
}

export interface IData {
    author: string,
    city: string,
    comment: string,
}