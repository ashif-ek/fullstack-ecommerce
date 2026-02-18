from rest_framework import serializers
from .models import Product, ProductImage, ProductReview


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "is_primary", "ordering"]


class ProductReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ProductReview
        fields = [
            "id",
            "user",
            "rating",
            "title",
            "comment",
            "is_verified_purchase",
            "created_at",
        ]
        read_only_fields = ["is_verified_purchase", "is_approved", "created_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        product = validated_data["product"]
        if ProductReview.objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError("You have already reviewed this product.")
        validated_data["user"] = user
        return super().create(validated_data)


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    # Get the latest 3 approved reviews
    reviews = serializers.SerializerMethodField()
    average_rating = serializers.FloatField(read_only=True)
    total_reviews = serializers.IntegerField(read_only=True)
    category = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_reviews(self, obj):
        # We only want approved reviews, limit to 3 for the list view/detail view summary
        reviews = obj.reviews.filter(is_approved=True).order_by("-created_at")[:3]
        return ProductReviewSerializer(reviews, many=True).data


class AdminProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True,
        required=False,
    )
    images = ProductImageSerializer(many=True, read_only=True)
    category = serializers.SlugRelatedField(
        slug_field="name",
        queryset=Product.category.field.related_model.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images", [])
        product = Product.objects.create(**validated_data)

        # Handle multiple images
        for img in uploaded_images:
            ProductImage.objects.create(product=product, image=img)

        return product

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop("uploaded_images", [])

        # Update standard fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Add new images to the gallery
        for img in uploaded_images:
            ProductImage.objects.create(product=instance, image=img)

        return instance
