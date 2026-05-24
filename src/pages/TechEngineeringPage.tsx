import TeamDetailPage from './TeamDetailPage';

const introPoints = [
  'Bạn có mong muốn mang tư duy công nghệ, khám phá kỹ thuật và tinh thần sáng tạo đến gần hơn với các em học sinh?',
  'Bạn muốn trực tiếp đồng hành trong những buổi học thực hành, chế tạo mô hình và trải nghiệm công nghệ ngay tại địa phương?',
  'Hãy đồng hành cùng Trại hè công nghệ - kỹ thuật phường Vĩnh Phúc trong chiến dịch tình nguyện hè năm nay!',
];

const TechEngineeringPage = () => {
  return (
    <TeamDetailPage
      teamKey="tech"
      introPoints={introPoints}
      projectTitle="Dự án công nghệ ứng dụng và thực hành kỹ thuật"
      variant="digital"
    />
  );
};

export default TechEngineeringPage;
