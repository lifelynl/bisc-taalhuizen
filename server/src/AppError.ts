import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorCode, ErrorMetaData } from './ErrorCodes'

export class AppError<TErrorCode extends ErrorCode> extends HttpException {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(errorCode: TErrorCode, metaData?: ErrorMetaData[TErrorCode]) {
        super(
            {
                errorCode: errorCode,
                metaData,
            },
            HttpStatus.BAD_REQUEST
        )
    }
}
