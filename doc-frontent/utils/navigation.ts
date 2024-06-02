export type INavigationLink = {
    link : string;
    title : string;
    icon  ?: string;
}
export const navigation : INavigationLink[] = [
    {
        link : '/patients',
        title : 'Patient',
        icon : 'pi pi-user'
    },
    {
        link : '/doctors',
        title : 'Doctors',
        icon : 'pi pi-users'
    },
    {
        link : '/settings',
        title : 'Settings',
        icon : 'pi pi-cog'
    },
]