export enum NotFoundError {
  USER = 'El usuario no ha sido encontrado.',
  GENERATION = 'La generación no ha sido encontrada. Intente más tarde.',
  ATTENDANCE = 'El registro de asistencia no ha sido encontrado. Intente más tarde.',
  CALENDAR = 'Error al crear una fecha en el calendario. Intente más tarde.',
}

export enum BadRequestError {
  EMAIL_USED = 'El correo electrónico ya se encuentra utilizado. Intente con uno diferente.',
  ENROLLMENT_USED = 'La matrícula ya se encuentra utilizada. Intente con uno diferente.',
}

export enum InternalServerError {
  SERVER = 'Error de servidor. Intente mas tarde.',
}
