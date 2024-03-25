// app.test.js

const { handleSubmit, getLocation } = require('./app');

describe('handleSubmit', () => {
    test('it prevents form submission and shows an alert', () => {
        const preventDefault = jest.fn();
        const alert = jest.fn();

        const event = { preventDefault };

        global.alert = alert;

        handleSubmit(event);

        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(alert).toHaveBeenCalledWith('Record submitted successfully!');
    });
});

describe('getLocation', () => {
    test('it retrieves the user location', async () => {
        const mockPosition = {
            coords: {
                latitude: 51.1,
                longitude: 45.3
            }
        };

        global.navigator.geolocation = {
            getCurrentPosition: jest.fn().mockImplementationOnce(success => {
                success(mockPosition);
            })
        };

        const location = await getLocation();
        expect(location).toEqual({ latitude: 51.1, longitude: 45.3 });
    });

    test('it handles geolocation not supported', async () => {
        global.navigator.geolocation = null;

        await expect(getLocation()).rejects.toMatch('Geolocation is not supported by your browser');
    });

    test('it handles geolocation retrieval failure', async () => {
        global.navigator.geolocation = {
            getCurrentPosition: jest.fn().mockImplementationOnce((success, error) => {
                error();
            })
        };

        await expect(getLocation()).rejects.toMatch('Unable to retrieve your location');
    });
});
