import { orderReducer } from "./order-reducer";
import { TOrderActions } from "../actions/order-details-actions";

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual([
        {
            orderNum: null,
            orderNumRequest: false,
            orderNumFailed: false,
        }
        ])
    })

    it('should handle UPLOAD_ORDER_DETAILS_REQUEST', () => {
        expect(
            orderReducer([], {
            type: TOrderActions.UPLOAD_ORDER_DETAILS_REQUEST,
            text: 'Run the tests'
        })
        ).toEqual([
        {
            text: 'Run the tests',
            completed: false,
            id: 0
        }
        ])

        expect(
            orderReducer(
            [
            {
                orderNum: null,
                orderNumRequest: false,
                orderNumFailed: false,
            }
            ],
            {
            type: TOrderActions.UPLOAD_ORDER_DETAILS_REQUEST,
            text: 'Run the tests'
            }
        )
        ).toEqual([
        {
            text: 'Run the tests',
            completed: false,
            id: 1
        },
        {
            text: 'Use Redux',
            completed: false,
            id: 0
        }
        ])
    })
}) 