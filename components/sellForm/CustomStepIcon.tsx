import { Box } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const stepIcons: Record<number, React.ReactElement> = {
    0: <CategoryIcon />,
    1: <InfoIcon />,
    2: <PermMediaIcon />,
    3: <LocationOnIcon />,
    4: <FactCheckIcon />,
};

const CustomStepIcon = (props: StepIconProps) => {
    const { active, completed, icon } = props;
    const stepIndex = Number(icon) - 1;

    return (
        <Box
            sx={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: active
                    ? "secondary.main"
                    : completed
                        ? "primary.main"
                        : "grey.300",
                color: active || completed ? "#fff" : "grey.600",
                transition: "all 0.3s ease",
                fontSize: 20,
            }}
        >
            {stepIcons[stepIndex]}
        </Box>
    );
};


export default CustomStepIcon;