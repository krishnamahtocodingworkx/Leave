"use client";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

interface Props {
    categoryData: {
        category: string;
        subCategory: string;
    };
    aboutData: {
        itemName: string;
        about: string;
        reasonToSell: string;
        price: string;
        condition: string;
    };
    mediaFiles: File[];
}

const VerifyDetails: React.FC<Props> = ({
    categoryData,
    aboutData,
    mediaFiles,
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Category Card */}
            <Card title="Category">
                <Grid>
                    <Item label="Category" value={categoryData.category} />
                    <Item label="Sub Category" value={categoryData.subCategory} />
                </Grid>
            </Card>

            {/* Item Details Card */}
            <Card title="Item Details">
                <Grid>
                    <Item label="Item Name" value={aboutData.itemName} />
                    <Item label="Price" value={`₹ ${aboutData.price}`} />
                    <Item label="Condition" value={aboutData.condition} />
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Description label="About Item" value={aboutData.about} />
                <Description
                    label="Reason to Sell"
                    value={aboutData.reasonToSell}
                />
            </Card>

            {/* Media Card */}
            <Card title={`Uploaded Media (${mediaFiles.length})`}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: 2.5,
                    }}
                >
                    {mediaFiles.map((file, index) => {
                        const url = URL.createObjectURL(file);
                        const isVideo = file.type.startsWith("video");

                        return (
                            <Box
                                key={index}
                                sx={{
                                    position: "relative",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    aspectRatio: "4 / 3",
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                                }}
                            >
                                {isVideo ? (
                                    <video
                                        src={url}
                                        muted
                                        autoPlay
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={url}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Card>
        </Box>
    );
};

export default VerifyDetails;

/* ---------------- UI Helpers ---------------- */

const Card = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <Box
        sx={{
            borderRadius: 3,
            p: { xs: 2.5, md: 3 },
            backgroundColor: "#fff",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        }}
    >
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        {children}
    </Box>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
            },
            gap: 2,
        }}
    >
        {children}
    </Box>
);

const Item = ({ label, value }: { label: string; value: string }) => (
    <Box>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
    </Box>
);

const Description = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => (
    <Box sx={{ mb: 2 }}>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm leading-relaxed text-gray-800">{value}</p>
    </Box>
);
