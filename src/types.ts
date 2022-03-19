export type RootStackParamList = {
    Default: undefined;
    בית: undefined;
    הרשמה: undefined;
    התחברות: undefined;
    תורים: undefined;
    פרטים: {
        id: string
        name: string | undefined,
        phone: string | undefined,
        date: string | undefined,

    };
    פרופיל: undefined;
    ביטול: {
        id: string,
        date: string | undefined
    };

}